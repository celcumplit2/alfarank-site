import {
  canSeeAll,
  clean,
  jsonResponse,
  nowIso,
  recordAudit,
  requireSalesUser,
  type SalesEnv,
  type SalesUser
} from "./_shared";

const MAX_FILE_BYTES = 1_750_000;
const MAX_DOCUMENTS_PER_ACTION = 12;
const ALLOWED_EXTENSIONS = new Set([
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "csv",
  "txt",
  "rtf",
  "odt",
  "ods",
  "ppt",
  "pptx",
  "png",
  "jpg",
  "jpeg",
  "webp",
  "heic",
  "zip"
]);

type ActionDocumentRow = {
  id: string;
  action_id: string;
  file_name: string;
  mime_type: string;
  byte_size: number;
  content?: ArrayBuffer | number[];
  uploaded_by: string;
  created_at: string;
};

function actionScope(user: SalesUser, alias = "a"): { sql: string; bindings: unknown[] } {
  if (canSeeAll(user)) return { sql: "", bindings: [] };
  return { sql: `${alias}.owner_id = ?`, bindings: [user.id] };
}

async function actionExists(env: SalesEnv, user: SalesUser, actionId: string): Promise<boolean> {
  const scope = actionScope(user);
  const conditions = ["a.id = ?"];
  const bindings: unknown[] = [actionId];
  if (scope.sql) {
    conditions.push(scope.sql);
    bindings.push(...scope.bindings);
  }

  const row = await env.DB.prepare(
    `SELECT a.id
    FROM sales_actions a
    WHERE ${conditions.join(" AND ")}
    LIMIT 1`
  )
    .bind(...bindings)
    .first<{ id: string }>();

  return Boolean(row);
}

function documentMetadata(row: ActionDocumentRow) {
  return {
    id: row.id,
    action_id: row.action_id,
    file_name: row.file_name,
    mime_type: row.mime_type,
    byte_size: row.byte_size,
    uploaded_by: row.uploaded_by,
    created_at: row.created_at
  };
}

function safeFileName(value: string): string {
  const withoutPath = value.replace(/\\/g, "/").split("/").pop() || "document";
  return withoutPath.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 180) || "document";
}

function fileExtension(fileName: string): string {
  const parts = fileName.toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() || "" : "";
}

function contentDisposition(fileName: string): string {
  const fallback = fileName.replace(/[^\x20-\x7e]/g, "_").replace(/["\\]/g, "_") || "document";
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

async function findDocument(env: SalesEnv, user: SalesUser, id: string): Promise<ActionDocumentRow | null> {
  const scope = actionScope(user);
  const conditions = ["d.id = ?"];
  const bindings: unknown[] = [id];
  if (scope.sql) {
    conditions.push(scope.sql);
    bindings.push(...scope.bindings);
  }

  return env.DB.prepare(
    `SELECT
      d.id,
      d.action_id,
      d.file_name,
      d.mime_type,
      d.byte_size,
      d.content,
      d.uploaded_by,
      d.created_at
    FROM sales_action_documents d
    INNER JOIN sales_actions a ON a.id = d.action_id
    WHERE ${conditions.join(" AND ")}
    LIMIT 1`
  )
    .bind(...bindings)
    .first<ActionDocumentRow>();
}

export const onRequestGet: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const userOrResponse = await requireSalesUser(request, env);
  if (userOrResponse instanceof Response) return userOrResponse;

  const user = userOrResponse;
  const url = new URL(request.url);
  const id = clean(url.searchParams.get("id"), 120);

  if (id) {
    const document = await findDocument(env, user, id);
    if (!document?.content) {
      return jsonResponse({ error: "Документ не найден." }, 404);
    }

    const content = document.content instanceof ArrayBuffer ? document.content : new Uint8Array(document.content);
    return new Response(content, {
      headers: {
        "cache-control": "private, no-store",
        "content-disposition": contentDisposition(document.file_name),
        "content-length": String(document.byte_size),
        "content-type": document.mime_type || "application/octet-stream",
        "x-content-type-options": "nosniff"
      }
    });
  }

  const scope = actionScope(user);
  const whereSql = scope.sql ? `WHERE ${scope.sql}` : "";
  const rows = await env.DB.prepare(
    `SELECT
      d.id,
      d.action_id,
      d.file_name,
      d.mime_type,
      d.byte_size,
      d.uploaded_by,
      d.created_at
    FROM sales_action_documents d
    INNER JOIN sales_actions a ON a.id = d.action_id
    ${whereSql}
    ORDER BY d.created_at ASC
    LIMIT 1000`
  )
    .bind(...scope.bindings)
    .all<ActionDocumentRow>();

  return jsonResponse({ documents: (rows.results || []).map(documentMetadata) });
};

export const onRequestPost: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const userOrResponse = await requireSalesUser(request, env);
  if (userOrResponse instanceof Response) return userOrResponse;

  const user = userOrResponse;
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonResponse({ error: "Не удалось прочитать загружаемый документ." }, 400);
  }

  const actionId = clean(form.get("action_id"), 120);
  const fileEntry = form.get("file") as unknown;
  if (!actionId || !(fileEntry instanceof File)) {
    return jsonResponse({ error: "Выберите действие и документ для загрузки." }, 400);
  }

  if (!(await actionExists(env, user, actionId))) {
    return jsonResponse({ error: "Действие не найдено." }, 404);
  }

  const fileName = safeFileName(fileEntry.name);
  const extension = fileExtension(fileName);
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return jsonResponse({ error: "Этот тип файла не поддерживается. Используйте документ, таблицу, презентацию, изображение или ZIP-архив." }, 400);
  }

  if (fileEntry.size <= 0) {
    return jsonResponse({ error: "Нельзя загрузить пустой файл." }, 400);
  }

  if (fileEntry.size > MAX_FILE_BYTES) {
    return jsonResponse({ error: "Файл слишком большой. Максимальный размер — 1,7 МБ." }, 413);
  }

  const count = await env.DB.prepare(
    "SELECT COUNT(*) AS total FROM sales_action_documents WHERE action_id = ?"
  )
    .bind(actionId)
    .first<{ total: number }>();
  if (Number(count?.total || 0) >= MAX_DOCUMENTS_PER_ACTION) {
    return jsonResponse({ error: `К одному действию можно прикрепить не больше ${MAX_DOCUMENTS_PER_ACTION} документов.` }, 409);
  }

  const id = `action_document_${crypto.randomUUID()}`;
  const createdAt = nowIso();
  const content = await fileEntry.arrayBuffer();
  const mimeType = clean(fileEntry.type, 160) || "application/octet-stream";

  await env.DB.prepare(
    `INSERT INTO sales_action_documents (
      id,
      action_id,
      file_name,
      mime_type,
      byte_size,
      content,
      uploaded_by,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(id, actionId, fileName, mimeType, fileEntry.size, content, user.id, createdAt)
    .run();

  const document = {
    id,
    action_id: actionId,
    file_name: fileName,
    mime_type: mimeType,
    byte_size: fileEntry.size,
    uploaded_by: user.id,
    created_at: createdAt
  };
  await recordAudit(env, user, "action_document", id, "upload", null, document);

  return jsonResponse({ document }, 201);
};

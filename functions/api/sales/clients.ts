import {
  CLIENT_STATUSES,
  PRIORITIES,
  SEGMENTS,
  canDeleteSalesData,
  canSeeAll,
  clean,
  isManagerId,
  jsonResponse,
  nullableClean,
  nowIso,
  oneOf,
  ownerCondition,
  parseJson,
  recordAudit,
  requireSalesUser,
  safeDate,
  todayParam,
  type SalesEnv,
  type SalesUser
} from "./_shared";

type ClientPayload = {
  id?: unknown;
  company_name?: unknown;
  segment?: unknown;
  website?: unknown;
  city?: unknown;
  contact_name?: unknown;
  contact_role?: unknown;
  contact_details?: unknown;
  source?: unknown;
  source_details?: unknown;
  last_contact_at?: unknown;
  status?: unknown;
  next_action?: unknown;
  next_action_at?: unknown;
  potential?: unknown;
  comment?: unknown;
  owner_id?: unknown;
};

type ClientRow = {
  id: string;
  company_name: string;
  segment: string;
  website: string | null;
  city: string | null;
  contact_name: string | null;
  contact_role: string | null;
  contact_details: string | null;
  source: string | null;
  source_details: string | null;
  last_contact_at: string | null;
  status: string;
  next_action: string | null;
  next_action_at: string | null;
  potential: string;
  comment: string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
  open_actions_count?: number;
  overdue_actions_count?: number;
  last_action_at?: string | null;
};

const CLIENT_SELECT = `SELECT
  c.id,
  c.company_name,
  c.segment,
  c.website,
  c.city,
  c.contact_name,
  c.contact_role,
  c.contact_details,
  c.source,
  c.source_details,
  c.last_contact_at,
  c.status,
  COALESCE(
    (
      SELECT a.task
      FROM sales_actions a
      WHERE a.client_id = c.id AND a.status <> 'Сделано'
      ORDER BY
        a.action_date ASC,
        CASE a.priority WHEN 'Высокий' THEN 1 WHEN 'Средний' THEN 2 ELSE 3 END,
        a.updated_at DESC
      LIMIT 1
    ),
    c.next_action
  ) AS next_action,
  COALESCE(
    (
      SELECT a.action_date
      FROM sales_actions a
      WHERE a.client_id = c.id AND a.status <> 'Сделано'
      ORDER BY
        a.action_date ASC,
        CASE a.priority WHEN 'Высокий' THEN 1 WHEN 'Средний' THEN 2 ELSE 3 END,
        a.updated_at DESC
      LIMIT 1
    ),
    c.next_action_at
  ) AS next_action_at,
  c.potential,
  c.comment,
  c.owner_id,
  c.created_at,
  c.updated_at,
  (
    SELECT COUNT(*)
    FROM sales_actions a
    WHERE a.client_id = c.id AND a.status <> 'Сделано'
  ) AS open_actions_count,
  (
    SELECT COUNT(*)
    FROM sales_actions a
    WHERE a.client_id = c.id AND a.status <> 'Сделано' AND a.action_date < ?
  ) AS overdue_actions_count,
  (
    SELECT MAX(a.action_date)
    FROM sales_actions a
    WHERE a.client_id = c.id
  ) AS last_action_at
FROM sales_clients c`;

function clientId(companyName: string): string {
  const slug = companyName
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 46);
  return `client_${slug || crypto.randomUUID().slice(0, 8)}_${crypto.randomUUID().slice(0, 8)}`;
}

function scopedClientWhere(user: SalesUser, id: string): { sql: string; bindings: unknown[] } {
  const conditions = ["id = ?"];
  const bindings: unknown[] = [id];
  if (!canSeeAll(user)) {
    conditions.push("owner_id = ?");
    bindings.push(user.id);
  }
  return {
    sql: conditions.join(" AND "),
    bindings
  };
}

async function findClient(env: SalesEnv, user: SalesUser, id: string, today: string): Promise<ClientRow | null> {
  const scope = scopedClientWhere(user, id);
  return env.DB.prepare(`${CLIENT_SELECT} WHERE ${scope.sql} LIMIT 1`)
    .bind(today, ...scope.bindings)
    .first<ClientRow>();
}

function validateClient(payload: ClientPayload): { data?: Record<string, string | null>; error?: string } {
  const companyName = clean(payload.company_name, 180);
  const status = oneOf(payload.status, CLIENT_STATUSES, "Новый");

  if (!companyName) {
    return { error: "Название компании обязательно." };
  }

  return {
    data: {
      company_name: companyName,
      segment: oneOf(payload.segment, SEGMENTS, "Другое"),
      website: nullableClean(payload.website, 240),
      city: nullableClean(payload.city, 120),
      contact_name: nullableClean(payload.contact_name, 160),
      contact_role: nullableClean(payload.contact_role, 160),
      contact_details: nullableClean(payload.contact_details, 300),
      source: nullableClean(payload.source, 240),
      source_details: nullableClean(payload.source_details, 4000),
      last_contact_at: safeDate(payload.last_contact_at),
      status,
      potential: oneOf(payload.potential, PRIORITIES, "Средний"),
      comment: nullableClean(payload.comment, 1000)
    }
  };
}

export const onRequestGet: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const userOrResponse = await requireSalesUser(request, env);
  if (userOrResponse instanceof Response) return userOrResponse;

  const user = userOrResponse;
  const url = new URL(request.url);
  const today = todayParam(request);
  const conditions: string[] = [];
  const bindings: unknown[] = [today];
  const scope = ownerCondition(user, "c");

  if (scope.sql) {
    conditions.push(scope.sql);
    bindings.push(...scope.bindings);
  }

  const search = clean(url.searchParams.get("search"), 120);
  if (search) {
    conditions.push(`(
      LOWER(c.company_name) LIKE LOWER(?)
      OR LOWER(COALESCE(c.contact_name, '')) LIKE LOWER(?)
      OR LOWER(COALESCE(c.city, '')) LIKE LOWER(?)
      OR LOWER(COALESCE(c.source, '')) LIKE LOWER(?)
    )`);
    bindings.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }

  const status = clean(url.searchParams.get("status"), 80);
  if (CLIENT_STATUSES.includes(status)) {
    conditions.push("c.status = ?");
    bindings.push(status);
  }

  const segment = clean(url.searchParams.get("segment"), 120);
  if (SEGMENTS.includes(segment)) {
    conditions.push("c.segment = ?");
    bindings.push(segment);
  }

  const potential = clean(url.searchParams.get("potential"), 40);
  if (PRIORITIES.includes(potential)) {
    conditions.push("c.potential = ?");
    bindings.push(potential);
  }

  if (url.searchParams.get("without_next_step") === "1") {
    conditions.push(`c.company_name <> ''
      AND c.status NOT IN ('Клиент', 'Отказ', 'Пауза')
      AND NOT EXISTS (
        SELECT 1
        FROM sales_actions a
        WHERE a.client_id = c.id AND a.status <> 'Сделано'
      )
      AND COALESCE(NULLIF(c.next_action, ''), '') = ''`);
  }

  if (url.searchParams.get("overdue") === "1") {
    conditions.push(`c.status NOT IN ('Клиент', 'Отказ', 'Пауза')
      AND (
        EXISTS (
          SELECT 1
          FROM sales_actions a
          WHERE a.client_id = c.id AND a.status <> 'Сделано' AND a.action_date < ?
        )
        OR (
          NOT EXISTS (
            SELECT 1
            FROM sales_actions a
            WHERE a.client_id = c.id AND a.status <> 'Сделано'
          )
          AND c.next_action_at < ?
        )
      )`);
    bindings.push(today);
    bindings.push(today);
  }

  const whereSql = conditions.length ? `WHERE ${conditions.join("\n  AND ")}` : "";
  const rows = await env.DB.prepare(
    `${CLIENT_SELECT}
    ${whereSql}
      ORDER BY
        CASE c.potential WHEN 'Высокий' THEN 1 WHEN 'Средний' THEN 2 ELSE 3 END,
      COALESCE(next_action_at, '9999-12-31') ASC,
      c.updated_at DESC
    LIMIT 300`
  )
    .bind(...bindings)
    .all<ClientRow>();

  return jsonResponse({
    clients: rows.results || [],
    dictionaries: {
      segments: SEGMENTS,
      statuses: CLIENT_STATUSES,
      potentials: PRIORITIES
    }
  });
};

export const onRequestPost: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const userOrResponse = await requireSalesUser(request, env);
  if (userOrResponse instanceof Response) return userOrResponse;

  const user = userOrResponse;
  const payload = await parseJson<ClientPayload>(request);
  const id = clean(payload.id, 120);
  const today = todayParam(request);
  const validation = validateClient(payload);

  if (validation.error || !validation.data) {
    return jsonResponse({ error: validation.error || "Некорректные данные клиента." }, 400);
  }

  const now = nowIso();
  const ownerId = canSeeAll(user) ? clean(payload.owner_id, 80) || "pavel" : user.id;

  if (!isManagerId(ownerId)) {
    return jsonResponse({ error: "Клиента нужно назначить на Павла или Славу." }, 400);
  }

  if (id) {
    const existing = await findClient(env, user, id, today);
    if (!existing) {
      return jsonResponse({ error: "Клиент не найден." }, 404);
    }

    await env.DB.prepare(
      `UPDATE sales_clients
      SET
        company_name = ?,
        segment = ?,
        website = ?,
        city = ?,
        contact_name = ?,
        contact_role = ?,
        contact_details = ?,
        source = ?,
        source_details = ?,
        last_contact_at = ?,
        status = ?,
        potential = ?,
        comment = ?,
        owner_id = ?,
        updated_at = ?
      WHERE id = ?`
    )
      .bind(
        validation.data.company_name,
        validation.data.segment,
        validation.data.website,
        validation.data.city,
        validation.data.contact_name,
        validation.data.contact_role,
        validation.data.contact_details,
        validation.data.source,
        validation.data.source_details,
        validation.data.last_contact_at,
        validation.data.status,
        validation.data.potential,
        validation.data.comment,
        canSeeAll(user) ? ownerId : existing.owner_id,
        now,
        id
      )
      .run();

    const updated = await findClient(env, user, id, today);
    await recordAudit(env, user, "client", id, "update", existing, updated);
    return jsonResponse({ client: updated });
  }

  const newId = clientId(String(validation.data.company_name));
  await env.DB.prepare(
    `INSERT INTO sales_clients (
      id,
      company_name,
      segment,
      website,
      city,
      contact_name,
      contact_role,
      contact_details,
      source,
      source_details,
      last_contact_at,
      status,
      next_action,
      next_action_at,
      potential,
      comment,
      owner_id,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      newId,
      validation.data.company_name,
      validation.data.segment,
      validation.data.website,
      validation.data.city,
      validation.data.contact_name,
      validation.data.contact_role,
      validation.data.contact_details,
      validation.data.source,
      validation.data.source_details,
      validation.data.last_contact_at,
      validation.data.status,
      null,
      null,
      validation.data.potential,
      validation.data.comment,
      ownerId,
      now,
      now
    )
    .run();

  const created = await findClient(env, user, newId, today);
  await recordAudit(env, user, "client", newId, "create", null, created);
  return jsonResponse({ client: created }, 201);
};

export const onRequestDelete: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const userOrResponse = await requireSalesUser(request, env);
  if (userOrResponse instanceof Response) return userOrResponse;

  const user = userOrResponse;
  if (!canDeleteSalesData(user)) {
    return jsonResponse({ error: "Удаление доступно только администратору." }, 403);
  }

  const url = new URL(request.url);
  const id = clean(url.searchParams.get("id"), 120);
  if (!id) {
    return jsonResponse({ error: "Не указан клиент для удаления." }, 400);
  }

  const today = todayParam(request);
  const existing = await findClient(env, user, id, today);
  if (!existing) {
    return jsonResponse({ error: "Клиент не найден." }, 404);
  }

  const relatedActions = await env.DB.prepare("SELECT * FROM sales_actions WHERE client_id = ?").bind(id).all();
  const actionRows = relatedActions.results || [];

  await env.DB.prepare("DELETE FROM sales_actions WHERE client_id = ?").bind(id).run();
  await env.DB.prepare("DELETE FROM sales_clients WHERE id = ?").bind(id).run();

  await recordAudit(
    env,
    user,
    "client",
    id,
    "delete",
    {
      ...existing,
      related_actions: actionRows
    },
    null
  );

  return jsonResponse({
    deleted: true,
    client_id: id,
    actions_deleted: actionRows.length
  });
};

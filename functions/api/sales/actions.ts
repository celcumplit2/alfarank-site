import {
  ACTION_STATUSES,
  ACTION_TYPES,
  CLIENT_STATUSES,
  PRIORITIES,
  TERMINAL_CLIENT_STATUSES,
  boolValue,
  canSeeAll,
  clean,
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

type ActionPayload = {
  id?: unknown;
  action_date?: unknown;
  client_id?: unknown;
  company_name?: unknown;
  contact_name?: unknown;
  priority?: unknown;
  action_type?: unknown;
  task?: unknown;
  result?: unknown;
  status?: unknown;
  next_step?: unknown;
  next_step_date?: unknown;
  help_required?: unknown;
  solution_options?: unknown;
  owner_id?: unknown;
  final_client_status?: unknown;
};

type ActionRow = {
  id: string;
  action_date: string;
  client_id: string | null;
  company_name: string;
  contact_name: string | null;
  priority: string;
  action_type: string;
  task: string;
  result: string | null;
  status: string;
  next_step: string | null;
  next_step_date: string | null;
  help_required: number;
  solution_options: string | null;
  owner_id: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  client_status?: string | null;
  client_next_action?: string | null;
  client_next_action_at?: string | null;
};

type ClientLite = {
  id: string;
  company_name: string;
  contact_name: string | null;
  owner_id: string;
  status: string;
};

const ACTION_SELECT = `SELECT
  a.*,
  c.status AS client_status,
  c.next_action AS client_next_action,
  c.next_action_at AS client_next_action_at
FROM sales_actions a
LEFT JOIN sales_clients c ON c.id = a.client_id`;

function scopedActionWhere(user: SalesUser, id: string): { sql: string; bindings: unknown[] } {
  const conditions = ["a.id = ?"];
  const bindings: unknown[] = [id];
  if (!canSeeAll(user)) {
    conditions.push("a.owner_id = ?");
    bindings.push(user.id);
  }
  return {
    sql: conditions.join(" AND "),
    bindings
  };
}

async function findAction(env: SalesEnv, user: SalesUser, id: string): Promise<ActionRow | null> {
  const scope = scopedActionWhere(user, id);
  return env.DB.prepare(`${ACTION_SELECT} WHERE ${scope.sql} LIMIT 1`)
    .bind(...scope.bindings)
    .first<ActionRow>();
}

async function findClient(env: SalesEnv, user: SalesUser, id: string): Promise<ClientLite | null> {
  const conditions = ["id = ?"];
  const bindings: unknown[] = [id];
  if (!canSeeAll(user)) {
    conditions.push("owner_id = ?");
    bindings.push(user.id);
  }

  return env.DB.prepare(
    `SELECT id, company_name, contact_name, owner_id, status
    FROM sales_clients
    WHERE ${conditions.join(" AND ")}
    LIMIT 1`
  )
    .bind(...bindings)
    .first<ClientLite>();
}

function optionsCount(value: string | null): number {
  if (!value) return 0;
  return value
    .split(/\n|;|\d+\)|\d+\./)
    .map((entry) => entry.trim())
    .filter(Boolean).length;
}

function validateAction(payload: ActionPayload): { data?: Record<string, string | number | null>; error?: string } {
  const actionDate = safeDate(payload.action_date);
  const clientId = clean(payload.client_id, 120);
  const task = clean(payload.task, 700);
  const status = oneOf(payload.status, ACTION_STATUSES, "Запланировано");
  const result = nullableClean(payload.result, 1200);
  const nextStep = nullableClean(payload.next_step, 700);
  const nextStepDate = safeDate(payload.next_step_date);
  const helpRequired = boolValue(payload.help_required) ? 1 : 0;
  const solutionOptions = nullableClean(payload.solution_options, 1500);
  const finalClientStatus = clean(payload.final_client_status, 80);

  if (!actionDate) {
    return { error: "У действия обязательно должна быть дата." };
  }

  if (!clientId) {
    return { error: "Сначала выберите клиента для действия." };
  }

  if (!task) {
    return { error: "Опишите конкретное действие." };
  }

  if (helpRequired && optionsCount(solutionOptions) < 2) {
    return { error: "Если нужна помощь, укажите минимум два варианта решения." };
  }

  if (status === "Сделано" && !result) {
    return { error: "Нельзя закрыть действие без результата." };
  }

  if (
    status === "Сделано" &&
    (!nextStep || !nextStepDate) &&
    !TERMINAL_CLIENT_STATUSES.includes(finalClientStatus)
  ) {
    return { error: "После закрытия нужно создать следующий шаг с датой или перевести клиента в Клиент, Отказ или Пауза." };
  }

  return {
    data: {
      action_date: actionDate,
      client_id: clientId,
      company_name: "",
      contact_name: null,
      priority: oneOf(payload.priority, PRIORITIES, "Средний"),
      action_type: oneOf(payload.action_type, ACTION_TYPES, "Звонок"),
      task,
      result,
      status,
      next_step: nextStep,
      next_step_date: nextStepDate,
      help_required: helpRequired,
      solution_options: solutionOptions,
      final_client_status: CLIENT_STATUSES.includes(finalClientStatus) ? finalClientStatus : null
    }
  };
}

async function updateClientNextStep(
  env: SalesEnv,
  user: SalesUser,
  clientId: string | null,
  nextStep: string | null,
  nextStepDate: string | null,
  finalStatus: string | null,
  completedAt: string
): Promise<void> {
  if (!clientId) return;

  const client = await findClient(env, user, clientId);
  if (!client) return;

  if (finalStatus && TERMINAL_CLIENT_STATUSES.includes(finalStatus)) {
    await env.DB.prepare(
      `UPDATE sales_clients
      SET status = ?, next_action = NULL, next_action_at = NULL, last_contact_at = ?, updated_at = ?
      WHERE id = ?`
    )
      .bind(finalStatus, completedAt.slice(0, 10), completedAt, clientId)
      .run();
    return;
  }

  if (nextStep && nextStepDate) {
    await env.DB.prepare(
      `UPDATE sales_clients
      SET next_action = ?, next_action_at = ?, last_contact_at = ?, updated_at = ?
      WHERE id = ?`
    )
      .bind(nextStep, nextStepDate, completedAt.slice(0, 10), completedAt, clientId)
      .run();
  }
}

async function createFollowUpAction(
  env: SalesEnv,
  action: Record<string, string | number | null>,
  ownerId: string,
  now: string
): Promise<ActionRow | null> {
  if (!action.next_step || !action.next_step_date) return null;

  const id = `action_${crypto.randomUUID()}`;
  await env.DB.prepare(
    `INSERT INTO sales_actions (
      id,
      action_date,
      client_id,
      company_name,
      contact_name,
      priority,
      action_type,
      task,
      result,
      status,
      next_step,
      next_step_date,
      help_required,
      solution_options,
      owner_id,
      completed_at,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, 'Запланировано', NULL, NULL, 0, NULL, ?, NULL, ?, ?)`
  )
    .bind(
      id,
      action.next_step_date,
      action.client_id,
      action.company_name,
      action.contact_name,
      action.priority || "Средний",
      "Повторный контакт",
      action.next_step,
      ownerId,
      now,
      now
    )
    .run();

  return env.DB.prepare(`${ACTION_SELECT} WHERE a.id = ? LIMIT 1`).bind(id).first<ActionRow>();
}

export const onRequestGet: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const userOrResponse = await requireSalesUser(request, env);
  if (userOrResponse instanceof Response) return userOrResponse;

  const user = userOrResponse;
  const url = new URL(request.url);
  const today = todayParam(request);
  const mode = clean(url.searchParams.get("mode"), 40) || "today";
  const conditions: string[] = [];
  const bindings: unknown[] = [];
  const scope = ownerCondition(user, "a");

  if (scope.sql) {
    conditions.push(scope.sql);
    bindings.push(...scope.bindings);
  }

  if (mode === "today") {
    conditions.push("a.action_date = ?");
    bindings.push(today);
  } else if (mode === "overdue") {
    conditions.push("a.action_date < ? AND a.status <> 'Сделано'");
    bindings.push(today);
  } else if (mode === "week") {
    conditions.push("a.action_date >= ? AND a.action_date <= date(?, '+7 days') AND a.status <> 'Сделано'");
    bindings.push(today, today);
  }

  const dateFrom = safeDate(url.searchParams.get("date_from"));
  if (dateFrom) {
    conditions.push("a.action_date >= ?");
    bindings.push(dateFrom);
  }

  const dateTo = safeDate(url.searchParams.get("date_to"));
  if (dateTo) {
    conditions.push("a.action_date <= ?");
    bindings.push(dateTo);
  }

  const status = clean(url.searchParams.get("status"), 80);
  if (ACTION_STATUSES.includes(status)) {
    conditions.push("a.status = ?");
    bindings.push(status);
  }

  const actionType = clean(url.searchParams.get("action_type"), 120);
  if (ACTION_TYPES.includes(actionType)) {
    conditions.push("a.action_type = ?");
    bindings.push(actionType);
  }

  const priority = clean(url.searchParams.get("priority"), 40);
  if (PRIORITIES.includes(priority)) {
    conditions.push("a.priority = ?");
    bindings.push(priority);
  }

  const company = clean(url.searchParams.get("company"), 120);
  if (company) {
    conditions.push("LOWER(a.company_name) LIKE LOWER(?)");
    bindings.push(`%${company}%`);
  }

  const whereSql = conditions.length ? `WHERE ${conditions.join("\n  AND ")}` : "";
  const rows = await env.DB.prepare(
    `${ACTION_SELECT}
    ${whereSql}
    ORDER BY
      CASE WHEN a.status = 'Сделано' THEN 2 ELSE 1 END,
      a.action_date ASC,
      CASE a.priority WHEN 'Высокий' THEN 1 WHEN 'Средний' THEN 2 ELSE 3 END,
      a.updated_at DESC
    LIMIT 500`
  )
    .bind(...bindings)
    .all<ActionRow>();

  return jsonResponse({
    actions: rows.results || [],
    dictionaries: {
      statuses: ACTION_STATUSES,
      types: ACTION_TYPES,
      priorities: PRIORITIES,
      terminal_client_statuses: TERMINAL_CLIENT_STATUSES
    }
  });
};

export const onRequestPost: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const userOrResponse = await requireSalesUser(request, env);
  if (userOrResponse instanceof Response) return userOrResponse;

  const user = userOrResponse;
  const payload = await parseJson<ActionPayload>(request);
  const id = clean(payload.id, 120);
  const validation = validateAction(payload);

  if (validation.error || !validation.data) {
    return jsonResponse({ error: validation.error || "Некорректные данные действия." }, 400);
  }

  const now = nowIso();
  let ownerId = canSeeAll(user) ? clean(payload.owner_id, 80) || user.id : user.id;

  if (validation.data.client_id) {
    const client = await findClient(env, user, String(validation.data.client_id));
    if (!client) {
      return jsonResponse({ error: "Клиент для действия не найден." }, 404);
    }
    ownerId = client.owner_id;
    validation.data.company_name = client.company_name;
    validation.data.contact_name = client.contact_name;
  }

  if (id) {
    const existing = await findAction(env, user, id);
    if (!existing) {
      return jsonResponse({ error: "Действие не найдено." }, 404);
    }

    const wasDone = existing.status === "Сделано";
    const isDone = validation.data.status === "Сделано";
    const completedAt = isDone ? existing.completed_at || now : null;

    await env.DB.prepare(
      `UPDATE sales_actions
      SET
        action_date = ?,
        client_id = ?,
        company_name = ?,
        contact_name = ?,
        priority = ?,
        action_type = ?,
        task = ?,
        result = ?,
        status = ?,
        next_step = ?,
        next_step_date = ?,
        help_required = ?,
        solution_options = ?,
        owner_id = ?,
        completed_at = ?,
        updated_at = ?
      WHERE id = ?`
    )
      .bind(
        validation.data.action_date,
        validation.data.client_id,
        validation.data.company_name,
        validation.data.contact_name,
        validation.data.priority,
        validation.data.action_type,
        validation.data.task,
        validation.data.result,
        validation.data.status,
        validation.data.next_step,
        validation.data.next_step_date,
        validation.data.help_required,
        validation.data.solution_options,
        canSeeAll(user) ? ownerId : existing.owner_id,
        completedAt,
        now,
        id
      )
      .run();

    let followUp: ActionRow | null = null;
    if (!wasDone && isDone) {
      await updateClientNextStep(
        env,
        user,
        String(validation.data.client_id || existing.client_id || ""),
        validation.data.next_step ? String(validation.data.next_step) : null,
        validation.data.next_step_date ? String(validation.data.next_step_date) : null,
        validation.data.final_client_status ? String(validation.data.final_client_status) : null,
        now
      );
      followUp = await createFollowUpAction(env, validation.data, canSeeAll(user) ? ownerId : existing.owner_id, now);
      if (followUp) {
        await recordAudit(env, user, "action", followUp.id, "create_follow_up", null, followUp);
      }
    }

    const updated = await findAction(env, user, id);
    await recordAudit(env, user, "action", id, "update", existing, updated);
    return jsonResponse({ action: updated, follow_up: followUp });
  }

  const newId = `action_${crypto.randomUUID()}`;
  const isDone = validation.data.status === "Сделано";
  await env.DB.prepare(
    `INSERT INTO sales_actions (
      id,
      action_date,
      client_id,
      company_name,
      contact_name,
      priority,
      action_type,
      task,
      result,
      status,
      next_step,
      next_step_date,
      help_required,
      solution_options,
      owner_id,
      completed_at,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      newId,
      validation.data.action_date,
      validation.data.client_id,
      validation.data.company_name,
      validation.data.contact_name,
      validation.data.priority,
      validation.data.action_type,
      validation.data.task,
      validation.data.result,
      validation.data.status,
      validation.data.next_step,
      validation.data.next_step_date,
      validation.data.help_required,
      validation.data.solution_options,
      ownerId,
      isDone ? now : null,
      now,
      now
    )
    .run();

  if (validation.data.client_id && validation.data.status !== "Сделано") {
    await updateClientNextStep(
      env,
      user,
      String(validation.data.client_id),
      String(validation.data.task),
      String(validation.data.action_date),
      null,
      now
    );
  }

  const created = await findAction(env, user, newId);
  await recordAudit(env, user, "action", newId, "create", null, created);
  return jsonResponse({ action: created }, 201);
};

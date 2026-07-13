import {
  canSeeAll,
  clean,
  isManagerId,
  jsonResponse,
  nowIso,
  nullableClean,
  parseJson,
  recordAudit,
  requireSalesUser,
  safeDate,
  type SalesEnv
} from "./_shared";

type WeeklyPayload = {
  id?: unknown;
  week_start?: unknown;
  manager_id?: unknown;
  manager_comment?: unknown;
  director_comment?: unknown;
};

type WeeklyRow = {
  id: string;
  week_start: string;
  manager_id: string;
  manager_comment: string | null;
  director_comment: string | null;
  created_at: string;
  updated_at: string;
};

async function findWeekly(env: SalesEnv, id: string): Promise<WeeklyRow | null> {
  return env.DB.prepare("SELECT * FROM sales_weekly_reviews WHERE id = ? LIMIT 1")
    .bind(id)
    .first<WeeklyRow>();
}

export const onRequestGet: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const userOrResponse = await requireSalesUser(request, env);
  if (userOrResponse instanceof Response) return userOrResponse;

  const user = userOrResponse;
  const condition = canSeeAll(user) ? "" : "WHERE manager_id = ?";
  const bindings = canSeeAll(user) ? [] : [user.id];
  const rows = await env.DB.prepare(
    `SELECT *
    FROM sales_weekly_reviews
    ${condition}
    ORDER BY week_start ASC
    LIMIT 30`
  )
    .bind(...bindings)
    .all<WeeklyRow>();

  return jsonResponse({ weekly_reviews: rows.results || [] });
};

export const onRequestPost: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const userOrResponse = await requireSalesUser(request, env);
  if (userOrResponse instanceof Response) return userOrResponse;

  const user = userOrResponse;
  const payload = await parseJson<WeeklyPayload>(request);
  const weekStart = safeDate(payload.week_start);
  const managerId = canSeeAll(user) ? clean(payload.manager_id, 80) || "pavel" : user.id;
  const id = clean(payload.id, 120) || `week_${(weekStart || "").replace(/-/g, "_")}_${managerId}`;

  if (!weekStart) {
    return jsonResponse({ error: "Дата начала недели обязательна." }, 400);
  }

  if (!isManagerId(managerId)) {
    return jsonResponse({ error: "Итоги недели можно вести только по Павлу или Славе." }, 400);
  }

  const existing = await findWeekly(env, id);
  if (existing && !canSeeAll(user) && existing.manager_id !== user.id) {
    return jsonResponse({ error: "Неделя не найдена." }, 404);
  }

  const now = nowIso();
  const managerComment = nullableClean(payload.manager_comment, 1500);
  const directorComment = canSeeAll(user) ? nullableClean(payload.director_comment, 1500) : existing?.director_comment || null;

  await env.DB.prepare(
    `INSERT INTO sales_weekly_reviews (
      id,
      week_start,
      manager_id,
      manager_comment,
      director_comment,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(week_start, manager_id) DO UPDATE SET
      manager_comment = excluded.manager_comment,
      director_comment = excluded.director_comment,
      updated_at = excluded.updated_at`
  )
    .bind(id, weekStart, managerId, managerComment, directorComment, now, now)
    .run();

  const updated = await findWeekly(env, id);
  await recordAudit(env, user, "weekly_review", id, existing ? "update" : "create", existing, updated);

  return jsonResponse({ weekly_review: updated });
};

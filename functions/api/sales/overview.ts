import {
  canSeeAll,
  jsonResponse,
  ownerCondition,
  requireSalesUser,
  todayParam,
  type SalesEnv,
  type SalesUser
} from "./_shared";

type CountRow = Record<string, number | string | null>;

async function firstRow<T extends Record<string, unknown>>(env: SalesEnv, sql: string, bindings: unknown[] = []): Promise<T> {
  const statement = env.DB.prepare(sql);
  const row = bindings.length ? await statement.bind(...bindings).first<T>() : await statement.first<T>();
  return (row || {}) as T;
}

async function allRows<T extends Record<string, unknown>>(env: SalesEnv, sql: string, bindings: unknown[] = []): Promise<T[]> {
  const statement = env.DB.prepare(sql);
  const result = bindings.length ? await statement.bind(...bindings).all<T>() : await statement.all<T>();
  return result.results || [];
}

function scopedWhere(user: SalesUser, alias: string): { sql: string; bindings: unknown[] } {
  const scope = ownerCondition(user, alias);
  return {
    sql: scope.sql ? `WHERE ${scope.sql}` : "",
    bindings: scope.bindings
  };
}

function weekStartFrom(today: string): string {
  const date = new Date(`${today}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return today;
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() - day + 1);
  return date.toISOString().slice(0, 10);
}

async function weeklyRows(env: SalesEnv, user: SalesUser): Promise<Record<string, unknown>[]> {
  const managerFilter = canSeeAll(user) ? "" : "WHERE w.manager_id = ?";
  const managerBindings = canSeeAll(user) ? [] : [user.id];
  const ownerFilter = canSeeAll(user) ? "AND owner_id = w.manager_id" : "AND owner_id = ?";
  const ownerBindings = canSeeAll(user) ? [] : [user.id];

  return allRows(
    env,
    `SELECT
      w.id,
      w.week_start,
      w.manager_id,
      w.manager_comment,
      w.director_comment,
      (
        SELECT COUNT(*)
        FROM sales_clients
        WHERE created_at >= w.week_start
          AND created_at < date(w.week_start, '+7 days')
          ${ownerFilter}
      ) AS new_companies,
      (
        SELECT COUNT(*)
        FROM sales_actions
        WHERE action_date >= w.week_start
          AND action_date < date(w.week_start, '+7 days')
          AND status = 'Сделано'
          ${ownerFilter}
      ) AS done_actions,
      (
        SELECT COUNT(*)
        FROM sales_actions
        WHERE action_date >= w.week_start
          AND action_date < date(w.week_start, '+7 days')
          AND action_type = 'Встреча'
          ${ownerFilter}
      ) AS meetings,
      (
        SELECT COUNT(*)
        FROM sales_actions
        WHERE action_date >= w.week_start
          AND action_date < date(w.week_start, '+7 days')
          AND action_type = 'КП отправлено'
          ${ownerFilter}
      ) AS proposals,
      (
        SELECT COUNT(*)
        FROM sales_clients
        WHERE next_action_at >= w.week_start
          AND next_action_at < date(w.week_start, '+7 days')
          AND status = 'Клиент'
          ${ownerFilter}
      ) AS new_clients,
      (
        SELECT COUNT(*)
        FROM sales_actions
        WHERE action_date < date(w.week_start, '+7 days')
          AND status <> 'Сделано'
          AND company_name <> ''
          ${ownerFilter}
      ) AS overdue_actions
    FROM sales_weekly_reviews w
    ${managerFilter}
    ORDER BY w.week_start ASC
    LIMIT 30`,
    [...ownerBindings, ...ownerBindings, ...ownerBindings, ...ownerBindings, ...ownerBindings, ...ownerBindings, ...managerBindings]
  );
}

export const onRequestGet: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const userOrResponse = await requireSalesUser(request, env);
  if (userOrResponse instanceof Response) return userOrResponse;

  const user = userOrResponse;
  const today = todayParam(request);
  const clientsScope = scopedWhere(user, "c");
  const actionsScope = scopedWhere(user, "a");
  const weekStart = weekStartFrom(today);

  const [clientTotals, actionTotals, currentWeek, planDays, upcomingActions, recentAudit, weeks] = await Promise.all([
    firstRow<CountRow>(
      env,
      `SELECT
        COUNT(*) AS companies_count,
        SUM(CASE WHEN c.status = 'Клиент' THEN 1 ELSE 0 END) AS clients_count,
        SUM(CASE
          WHEN c.status NOT IN ('Клиент', 'Отказ', 'Пауза')
            AND COALESCE(NULLIF(c.next_action, ''), '') = ''
          THEN 1 ELSE 0 END
        ) AS without_next_step_count
      FROM sales_clients c
      ${clientsScope.sql}`,
      clientsScope.bindings
    ),
    firstRow<CountRow>(
      env,
      `SELECT
        COUNT(*) AS actions_count,
        SUM(CASE WHEN a.action_type = 'Встреча' THEN 1 ELSE 0 END) AS meetings_count,
        SUM(CASE WHEN a.action_type = 'КП отправлено' THEN 1 ELSE 0 END) AS proposals_count,
        SUM(CASE WHEN a.action_date < ? AND a.status <> 'Сделано' THEN 1 ELSE 0 END) AS overdue_count,
        SUM(CASE WHEN a.action_date = ? AND a.status <> 'Сделано' THEN 1 ELSE 0 END) AS today_count,
        SUM(CASE WHEN a.action_date >= ? AND a.action_date <= date(?, '+7 days') AND a.status <> 'Сделано' THEN 1 ELSE 0 END) AS next7_count,
        SUM(CASE WHEN a.status = 'Сделано' THEN 1 ELSE 0 END) AS done_count
      FROM sales_actions a
      ${actionsScope.sql}`,
      [today, today, today, today, ...actionsScope.bindings]
    ),
    firstRow<CountRow>(
      env,
      `SELECT
        COUNT(*) AS week_actions,
        SUM(CASE WHEN status = 'Сделано' THEN 1 ELSE 0 END) AS week_done,
        SUM(CASE WHEN action_type = 'Встреча' THEN 1 ELSE 0 END) AS week_meetings,
        SUM(CASE WHEN action_type = 'КП отправлено' THEN 1 ELSE 0 END) AS week_proposals
      FROM sales_actions a
      WHERE a.action_date >= ?
        AND a.action_date < date(?, '+7 days')
        ${actionsScope.sql ? `AND ${actionsScope.sql.replace(/^WHERE\s+/i, "")}` : ""}`,
      [weekStart, weekStart, ...actionsScope.bindings]
    ),
    allRows(
      env,
      `SELECT *
      FROM sales_plan_days
      ORDER BY plan_date ASC
      LIMIT 20`
    ),
    allRows(
      env,
      `SELECT a.*
      FROM sales_actions a
      ${actionsScope.sql}
      ${actionsScope.sql ? "AND" : "WHERE"} a.status <> 'Сделано'
        AND a.action_date >= ?
      ORDER BY a.action_date ASC,
        CASE a.priority WHEN 'Высокий' THEN 1 WHEN 'Средний' THEN 2 ELSE 3 END
      LIMIT 12`,
      [...actionsScope.bindings, today]
    ),
    allRows(
      env,
      `SELECT *
      FROM sales_audit_log
      ORDER BY created_at DESC
      LIMIT 12`
    ),
    weeklyRows(env, user)
  ]);

  return jsonResponse({
    generated_at: new Date().toISOString(),
    today,
    user,
    goals: {
      days: 60,
      clients: 10,
      meetings: 40,
      proposals: 20,
      new_companies: 160
    },
    metrics: {
      ...clientTotals,
      ...actionTotals,
      ...currentWeek
    },
    plan_days: planDays,
    upcoming_actions: upcomingActions,
    weekly_reviews: weeks,
    recent_audit: recentAudit
  });
};

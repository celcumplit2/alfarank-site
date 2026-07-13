import {
  canSeeAll,
  jsonResponse,
  nowIso,
  recordAudit,
  requireSalesUser,
  type SalesEnv
} from "./_shared";

export const onRequestPost: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const userOrResponse = await requireSalesUser(request, env);
  if (userOrResponse instanceof Response) return userOrResponse;

  const user = userOrResponse;
  if (!canSeeAll(user)) {
    return jsonResponse({ error: "Импорт доступен руководителю или администратору." }, 403);
  }

  const now = nowIso();

  await env.DB.batch([
    env.DB.prepare(
      `INSERT OR IGNORE INTO sales_clients (
        id,
        company_name,
        segment,
        website,
        city,
        contact_name,
        contact_role,
        contact_details,
        source,
        last_contact_at,
        status,
        next_action,
        next_action_at,
        potential,
        comment,
        owner_id,
        created_at,
        updated_at
      ) VALUES
        ('client_dental_expert', 'Dental Expert', 'Медицина', 'https://example.md', 'Кишинёв', 'Имя Фамилия', 'Владелец', '+373...', 'Рекомендация', '2026-07-13', 'Новый', 'Позвонить и назначить встречу', '2026-07-14', 'Высокий', 'Импортировано из Excel-прототипа.', 'pavel', ?, ?),
        ('client_medica_plus', 'Medica Plus', 'Медицина', 'https://example.md', 'Кишинёв', 'Имя Фамилия', 'Директор', '+373...', 'Знакомство', '2026-07-13', 'Контакт', 'Отправить краткое описание', '2026-07-15', 'Средний', 'Импортировано из Excel-прототипа.', 'slava', ?, ?)`
    ).bind(now, now, now, now),
    env.DB.prepare(
      `INSERT OR IGNORE INTO sales_actions (
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
      ) VALUES
        ('action_dental_expert_call', '2026-07-13', 'client_dental_expert', 'Dental Expert', 'Имя Фамилия', 'Высокий', 'Звонок', 'Позвонить владельцу и назначить 20-минутную встречу', NULL, 'Запланировано', 'Повторный звонок', '2026-07-14', 0, NULL, 'pavel', NULL, ?, ?),
        ('action_medica_plus_meeting', '2026-07-13', 'client_medica_plus', 'Medica Plus', 'Имя Фамилия', 'Высокий', 'Встреча', 'Обсудить текущий поток заявок и обработку лидов', NULL, 'Запланировано', 'Подготовить предложение', '2026-07-15', 0, NULL, 'slava', NULL, ?, ?)`
    ).bind(now, now, now, now)
  ]);

  await recordAudit(env, user, "system", "excel_prototype", "import_prototype", null, {
    clients: 2,
    actions: 2,
    source: "AlfaRank_Sales_Tracker.xlsx"
  });

  return jsonResponse({
    imported: true,
    source: "AlfaRank_Sales_Tracker.xlsx",
    clients: 2,
    actions: 2
  });
};

export const onRequestGet: PagesFunction = async () =>
  jsonResponse({ error: "Method not allowed." }, 405);

CREATE TABLE IF NOT EXISTS sales_clients (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  segment TEXT NOT NULL DEFAULT 'Другое',
  website TEXT,
  city TEXT,
  contact_name TEXT,
  contact_role TEXT,
  contact_details TEXT,
  source TEXT,
  last_contact_at TEXT,
  status TEXT NOT NULL DEFAULT 'Новый',
  next_action TEXT,
  next_action_at TEXT,
  potential TEXT NOT NULL DEFAULT 'Средний',
  comment TEXT,
  owner_id TEXT NOT NULL DEFAULT 'pavel',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sales_clients_owner
  ON sales_clients (owner_id);

CREATE INDEX IF NOT EXISTS idx_sales_clients_status
  ON sales_clients (status);

CREATE INDEX IF NOT EXISTS idx_sales_clients_next_action_at
  ON sales_clients (next_action_at);

CREATE TABLE IF NOT EXISTS sales_actions (
  id TEXT PRIMARY KEY,
  action_date TEXT NOT NULL,
  client_id TEXT,
  company_name TEXT NOT NULL,
  contact_name TEXT,
  priority TEXT NOT NULL DEFAULT 'Средний',
  action_type TEXT NOT NULL DEFAULT 'Звонок',
  task TEXT NOT NULL,
  result TEXT,
  status TEXT NOT NULL DEFAULT 'Запланировано',
  next_step TEXT,
  next_step_date TEXT,
  help_required INTEGER NOT NULL DEFAULT 0,
  solution_options TEXT,
  owner_id TEXT NOT NULL DEFAULT 'pavel',
  completed_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES sales_clients (id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_sales_actions_owner
  ON sales_actions (owner_id);

CREATE INDEX IF NOT EXISTS idx_sales_actions_date
  ON sales_actions (action_date);

CREATE INDEX IF NOT EXISTS idx_sales_actions_status
  ON sales_actions (status);

CREATE INDEX IF NOT EXISTS idx_sales_actions_client
  ON sales_actions (client_id);

CREATE TABLE IF NOT EXISTS sales_weekly_reviews (
  id TEXT PRIMARY KEY,
  week_start TEXT NOT NULL,
  manager_id TEXT NOT NULL DEFAULT 'pavel',
  manager_comment TEXT,
  director_comment TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (week_start, manager_id)
);

CREATE INDEX IF NOT EXISTS idx_sales_weekly_reviews_week
  ON sales_weekly_reviews (week_start);

CREATE TABLE IF NOT EXISTS sales_plan_days (
  id TEXT PRIMARY KEY,
  plan_date TEXT NOT NULL UNIQUE,
  focus TEXT NOT NULL,
  new_companies INTEGER NOT NULL DEFAULT 0,
  contacts INTEGER NOT NULL DEFAULT 0,
  meetings INTEGER NOT NULL DEFAULT 0,
  proposals INTEGER NOT NULL DEFAULT 0,
  main_result TEXT,
  note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sales_audit_log (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  before_json TEXT,
  after_json TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sales_audit_log_created_at
  ON sales_audit_log (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_sales_audit_log_entity
  ON sales_audit_log (entity_type, entity_id);

INSERT OR IGNORE INTO sales_clients (
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
  (
    'client_dental_expert',
    'Dental Expert',
    'Медицина',
    'https://example.md',
    'Кишинёв',
    'Имя Фамилия',
    'Владелец',
    '+373...',
    'Рекомендация',
    '2026-07-13',
    'Новый',
    'Позвонить и назначить встречу',
    '2026-07-14',
    'Высокий',
    'Импортировано из Excel-прототипа. Заменить пример после начала работы.',
    'pavel',
    '2026-07-13T08:00:00.000Z',
    '2026-07-13T08:00:00.000Z'
  ),
  (
    'client_medica_plus',
    'Medica Plus',
    'Медицина',
    'https://example.md',
    'Кишинёв',
    'Имя Фамилия',
    'Директор',
    '+373...',
    'Знакомство',
    '2026-07-13',
    'Контакт',
    'Отправить краткое описание',
    '2026-07-15',
    'Средний',
    'Импортировано из Excel-прототипа.',
    'slava',
    '2026-07-13T08:10:00.000Z',
    '2026-07-13T08:10:00.000Z'
  );

INSERT OR IGNORE INTO sales_actions (
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
  (
    'action_dental_expert_call',
    '2026-07-13',
    'client_dental_expert',
    'Dental Expert',
    'Имя Фамилия',
    'Высокий',
    'Звонок',
    'Позвонить владельцу и назначить 20-минутную встречу',
    NULL,
    'Запланировано',
    'Повторный звонок',
    '2026-07-14',
    0,
    NULL,
    'pavel',
    NULL,
    '2026-07-13T08:20:00.000Z',
    '2026-07-13T08:20:00.000Z'
  ),
  (
    'action_medica_plus_meeting',
    '2026-07-13',
    'client_medica_plus',
    'Medica Plus',
    'Имя Фамилия',
    'Высокий',
    'Встреча',
    'Обсудить текущий поток заявок и обработку лидов',
    NULL,
    'Запланировано',
    'Подготовить предложение',
    '2026-07-15',
    0,
    NULL,
    'slava',
    NULL,
    '2026-07-13T08:25:00.000Z',
    '2026-07-13T08:25:00.000Z'
  );

INSERT OR IGNORE INTO sales_plan_days (
  id,
  plan_date,
  focus,
  new_companies,
  contacts,
  meetings,
  proposals,
  main_result,
  note,
  created_at,
  updated_at
) VALUES
  (
    'plan_2026_07_13',
    '2026-07-13',
    'Новые компании',
    15,
    8,
    1,
    0,
    'Сформировать первый список и выйти на ЛПР',
    NULL,
    '2026-07-13T07:00:00.000Z',
    '2026-07-13T07:00:00.000Z'
  ),
  (
    'plan_2026_07_14',
    '2026-07-14',
    'Контакты и ЛПР',
    10,
    8,
    2,
    0,
    'Назначить встречи и собрать боли',
    NULL,
    '2026-07-13T07:00:00.000Z',
    '2026-07-13T07:00:00.000Z'
  ),
  (
    'plan_2026_07_15',
    '2026-07-15',
    'Встречи и квалификация',
    15,
    8,
    2,
    1,
    'Провести встречи, подготовить КП',
    NULL,
    '2026-07-13T07:00:00.000Z',
    '2026-07-13T07:00:00.000Z'
  ),
  (
    'plan_2026_07_16',
    '2026-07-16',
    'Предложения и офферы',
    10,
    8,
    2,
    1,
    'Проверить гипотезы и офферы',
    NULL,
    '2026-07-13T07:00:00.000Z',
    '2026-07-13T07:00:00.000Z'
  ),
  (
    'plan_2026_07_17',
    '2026-07-17',
    'Диагностика и повторные контакты',
    10,
    8,
    3,
    2,
    'Закрыть неделю с конкретными следующими шагами',
    NULL,
    '2026-07-13T07:00:00.000Z',
    '2026-07-13T07:00:00.000Z'
  );

INSERT OR IGNORE INTO sales_weekly_reviews (
  id,
  week_start,
  manager_id,
  manager_comment,
  director_comment,
  created_at,
  updated_at
) VALUES
  ('week_2026_07_13_pavel', '2026-07-13', 'pavel', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_07_20_pavel', '2026-07-20', 'pavel', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_07_27_pavel', '2026-07-27', 'pavel', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_08_03_pavel', '2026-08-03', 'pavel', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_08_10_pavel', '2026-08-10', 'pavel', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_08_17_pavel', '2026-08-17', 'pavel', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_08_24_pavel', '2026-08-24', 'pavel', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_08_31_pavel', '2026-08-31', 'pavel', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_07_13_slava', '2026-07-13', 'slava', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_07_20_slava', '2026-07-20', 'slava', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_07_27_slava', '2026-07-27', 'slava', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_08_03_slava', '2026-08-03', 'slava', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_08_10_slava', '2026-08-10', 'slava', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_08_17_slava', '2026-08-17', 'slava', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_08_24_slava', '2026-08-24', 'slava', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z'),
  ('week_2026_08_31_slava', '2026-08-31', 'slava', NULL, NULL, '2026-07-13T07:00:00.000Z', '2026-07-13T07:00:00.000Z');

INSERT OR IGNORE INTO sales_audit_log (
  id,
  entity_type,
  entity_id,
  action,
  actor_id,
  before_json,
  after_json,
  created_at
) VALUES
  (
    'audit_initial_excel_import',
    'system',
    'excel_prototype',
    'import_prototype',
    'system',
    NULL,
    '{"clients":2,"actions":2,"plan_days":5,"weekly_reviews":8}',
    '2026-07-13T07:00:00.000Z'
  );

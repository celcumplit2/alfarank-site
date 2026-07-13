UPDATE sales_clients
SET
  segment = 'Медицина',
  updated_at = '2026-07-13T09:00:00.000Z'
WHERE id IN ('client_dental_expert', 'client_medica_plus')
  AND segment IN ('Стоматология', 'Многопрофильная клиника');

UPDATE sales_plan_days
SET
  focus = CASE id
    WHEN 'plan_2026_07_13' THEN 'Новые компании'
    WHEN 'plan_2026_07_14' THEN 'Контакты и ЛПР'
    WHEN 'plan_2026_07_15' THEN 'Встречи и квалификация'
    WHEN 'plan_2026_07_16' THEN 'Предложения и офферы'
    ELSE focus
  END,
  main_result = CASE id
    WHEN 'plan_2026_07_13' THEN 'Сформировать первый список и выйти на ЛПР'
    WHEN 'plan_2026_07_14' THEN 'Назначить встречи и собрать боли'
    WHEN 'plan_2026_07_15' THEN 'Провести встречи, уточнить потребности'
    WHEN 'plan_2026_07_16' THEN 'Проверить гипотезы и офферы'
    ELSE main_result
  END,
  updated_at = '2026-07-13T09:00:00.000Z'
WHERE id IN ('plan_2026_07_13', 'plan_2026_07_14', 'plan_2026_07_15', 'plan_2026_07_16');

INSERT OR IGNORE INTO sales_audit_log (
  id,
  entity_type,
  entity_id,
  action,
  actor_id,
  before_json,
  after_json,
  created_at
) VALUES (
  'audit_generalize_sales_copy',
  'system',
  'sales_tracker',
  'generalize_copy',
  'system',
  NULL,
  '{"reason":"Tracker is for companies, not a clinic-only vertical."}',
  '2026-07-13T09:00:00.000Z'
);

UPDATE sales_clients
SET owner_id = 'pavel', updated_at = '2026-07-13T10:00:00.000Z'
WHERE owner_id = 'manager';

UPDATE sales_actions
SET owner_id = 'pavel', updated_at = '2026-07-13T10:00:00.000Z'
WHERE owner_id = 'manager';

UPDATE sales_weekly_reviews
SET
  id = replace(id, '_manager', '_pavel'),
  manager_id = 'pavel',
  updated_at = '2026-07-13T10:00:00.000Z'
WHERE manager_id = 'manager';

UPDATE sales_audit_log
SET actor_id = 'pavel'
WHERE actor_id = 'manager';

UPDATE sales_audit_log
SET actor_id = 'andrey'
WHERE actor_id IN ('director', 'admin');

INSERT OR IGNORE INTO sales_weekly_reviews (
  id,
  week_start,
  manager_id,
  manager_comment,
  director_comment,
  created_at,
  updated_at
) VALUES
  ('week_2026_07_13_slava', '2026-07-13', 'slava', NULL, NULL, '2026-07-13T10:00:00.000Z', '2026-07-13T10:00:00.000Z'),
  ('week_2026_07_20_slava', '2026-07-20', 'slava', NULL, NULL, '2026-07-13T10:00:00.000Z', '2026-07-13T10:00:00.000Z'),
  ('week_2026_07_27_slava', '2026-07-27', 'slava', NULL, NULL, '2026-07-13T10:00:00.000Z', '2026-07-13T10:00:00.000Z'),
  ('week_2026_08_03_slava', '2026-08-03', 'slava', NULL, NULL, '2026-07-13T10:00:00.000Z', '2026-07-13T10:00:00.000Z'),
  ('week_2026_08_10_slava', '2026-08-10', 'slava', NULL, NULL, '2026-07-13T10:00:00.000Z', '2026-07-13T10:00:00.000Z'),
  ('week_2026_08_17_slava', '2026-08-17', 'slava', NULL, NULL, '2026-07-13T10:00:00.000Z', '2026-07-13T10:00:00.000Z'),
  ('week_2026_08_24_slava', '2026-08-24', 'slava', NULL, NULL, '2026-07-13T10:00:00.000Z', '2026-07-13T10:00:00.000Z'),
  ('week_2026_08_31_slava', '2026-08-31', 'slava', NULL, NULL, '2026-07-13T10:00:00.000Z', '2026-07-13T10:00:00.000Z');

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
  'audit_named_sales_users',
  'system',
  'sales_users',
  'configure_named_users',
  'system',
  '{"users":["manager","director","admin"]}',
  '{"users":["pavel","slava","andrey"],"managers":["pavel","slava"],"admin":"andrey"}',
  '2026-07-13T10:00:00.000Z'
);

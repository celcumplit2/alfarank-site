UPDATE sales_actions
SET action_date = '2026-07-13',
    updated_at = '2026-07-13T11:30:00.000Z'
WHERE id = 'action_medica_plus_meeting'
  AND owner_id = 'slava';

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
  'audit_slava_example_action_today',
  'action',
  'action_medica_plus_meeting',
  'adjust_example_date',
  'system',
  '{"action_date":"2026-07-14"}',
  '{"action_date":"2026-07-13","reason":"Keep Slava example visible on the default working date."}',
  '2026-07-13T11:30:00.000Z'
);

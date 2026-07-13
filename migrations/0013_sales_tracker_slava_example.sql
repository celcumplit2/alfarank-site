UPDATE sales_clients
SET owner_id = 'slava', updated_at = '2026-07-13T11:00:00.000Z'
WHERE id = 'client_medica_plus';

UPDATE sales_actions
SET owner_id = 'slava', updated_at = '2026-07-13T11:00:00.000Z'
WHERE client_id = 'client_medica_plus'
   OR id = 'action_medica_plus_meeting';

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
  'audit_assign_example_client_to_slava',
  'client',
  'client_medica_plus',
  'assign_example_owner',
  'system',
  '{"owner_id":"pavel"}',
  '{"owner_id":"slava","reason":"Example client for the second manager."}',
  '2026-07-13T11:00:00.000Z'
);

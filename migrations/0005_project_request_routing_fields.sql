ALTER TABLE project_requests ADD COLUMN lead_score INTEGER;
ALTER TABLE project_requests ADD COLUMN lead_priority TEXT;
ALTER TABLE project_requests ADD COLUMN routing_bucket TEXT;
ALTER TABLE project_requests ADD COLUMN next_action TEXT;

CREATE INDEX IF NOT EXISTS idx_project_requests_lead_priority
  ON project_requests (lead_priority);

CREATE INDEX IF NOT EXISTS idx_project_requests_routing_bucket
  ON project_requests (routing_bucket);

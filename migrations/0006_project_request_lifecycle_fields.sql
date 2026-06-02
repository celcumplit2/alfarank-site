ALTER TABLE project_requests ADD COLUMN lead_owner TEXT;
ALTER TABLE project_requests ADD COLUMN lead_follow_up_note TEXT;
ALTER TABLE project_requests ADD COLUMN lead_status_updated_at TEXT;

CREATE INDEX IF NOT EXISTS idx_project_requests_lead_owner
  ON project_requests (lead_owner);

CREATE INDEX IF NOT EXISTS idx_project_requests_status_updated_at
  ON project_requests (lead_status_updated_at DESC);

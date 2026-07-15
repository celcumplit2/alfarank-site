ALTER TABLE project_requests ADD COLUMN conversion_token_hash TEXT;
ALTER TABLE project_requests ADD COLUMN conversion_recorded_at TEXT;

CREATE INDEX IF NOT EXISTS idx_project_requests_conversion_token_hash
  ON project_requests (conversion_token_hash);

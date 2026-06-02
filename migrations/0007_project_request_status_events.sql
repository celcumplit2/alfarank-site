CREATE TABLE IF NOT EXISTS project_request_status_events (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL,
  previous_status TEXT,
  status TEXT NOT NULL,
  owner TEXT,
  next_action TEXT,
  note TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES project_requests(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_project_request_status_events_lead_id
  ON project_request_status_events (lead_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_project_request_status_events_status
  ON project_request_status_events (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_project_request_status_events_created_at
  ON project_request_status_events (created_at DESC);

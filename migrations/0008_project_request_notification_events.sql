CREATE TABLE IF NOT EXISTS project_request_notification_events (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  channel TEXT NOT NULL,
  status TEXT NOT NULL,
  status_code INTEGER,
  error_message TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES project_requests(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_project_request_notification_events_lead_id
  ON project_request_notification_events (lead_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_project_request_notification_events_event_type
  ON project_request_notification_events (event_type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_project_request_notification_events_status
  ON project_request_notification_events (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_project_request_notification_events_created_at
  ON project_request_notification_events (created_at DESC);

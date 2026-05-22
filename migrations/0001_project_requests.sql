CREATE TABLE IF NOT EXISTS project_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT,
  current_system TEXT,
  business_problem TEXT NOT NULL,
  desired_result TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  source_path TEXT,
  user_agent TEXT,
  ip_address TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_project_requests_created_at
  ON project_requests (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_project_requests_status
  ON project_requests (status);

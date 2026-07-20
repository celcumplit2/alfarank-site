CREATE TABLE IF NOT EXISTS sales_action_documents (
  id TEXT PRIMARY KEY,
  action_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL DEFAULT 'application/octet-stream',
  byte_size INTEGER NOT NULL,
  content BLOB NOT NULL,
  uploaded_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (action_id) REFERENCES sales_actions (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sales_action_documents_action
  ON sales_action_documents (action_id, created_at DESC);

ALTER TABLE project_requests ADD COLUMN form_variant TEXT;

CREATE INDEX IF NOT EXISTS idx_project_requests_form_variant
  ON project_requests (form_variant);

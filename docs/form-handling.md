# Start Project Form Handling

The `/start-project/` form posts to a Cloudflare Pages Function:

```text
POST /api/start-project
```

The function writes submissions into Cloudflare D1 using the `DB` binding.

Production status:

- D1 database: `alfarank-project-requests`
- binding: `DB`
- migrations applied:
  `migrations/0001_project_requests.sql`,
  `migrations/0002_project_request_intake_fields.sql`, and
  `migrations/0003_project_request_tracking_fields.sql`
- verified on production: form POST redirects to `/start-project/thank-you/`
  and creates a D1 record.

## D1 Table

Migration file:

```text
migrations/0001_project_requests.sql
```

Table:

```text
project_requests
```

Fields:

- `id`
- `name`
- `email`
- `project_type`
- `current_system`
- `business_problem`
- `desired_result`
- `desired_output`
- `integrations`
- `contact_details`
- `budget`
- `timeline`
- `source_path`
- `landing_page`
- `landing_offer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `user_agent`
- `ip_address`
- `status`
- `created_at`

## Cloudflare Setup

Create the D1 database:

```bash
npx wrangler d1 create alfarank-project-requests
```

Copy the returned `database_id` into `wrangler.toml`.

Apply the migration:

```bash
npx wrangler d1 migrations apply alfarank-project-requests
```

For remote migration commands in this workspace, Wrangler expects the token as
`CLOUDFLARE_API_TOKEN`. If the active token is stored under another local
variable name, assign it to `CLOUDFLARE_API_TOKEN` for the command process.

Wrangler is installed as a project dev dependency so migration scripts use the
local binary instead of installing `wrangler` through `npx` on every run. This
avoids the Windows npm cache `EBUSY` lock that can happen during temporary
Wrangler/Miniflare installs.

Useful scripts:

```bash
npm run db:migrate:local
npm run db:migrate:remote
npm run db:migrations:remote
```

For Cloudflare Pages, make sure the D1 binding is named:

```text
DB
```

Note: `wrangler.toml` should only include the D1 binding after the real
`database_id` is available. A placeholder `database_id` will make Cloudflare
Pages deployment fail during the deploy stage.

## Flow

```text
Form -> /api/start-project -> Cloudflare Pages Function -> D1 -> /start-project/thank-you/
```

The form also includes a hidden honeypot field named `company_website`.

# Start Project Form Handling

The `/start-project/` form posts to a Cloudflare Pages Function:

```text
POST /api/start-project
```

The function writes submissions into Cloudflare D1 using the `DB` binding.

Production status:

- D1 database: `alfarank-project-requests`
- binding: `DB`
- migration applied: `migrations/0001_project_requests.sql`
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
- `budget`
- `timeline`
- `source_path`
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

# AlfaRank.com

Corporate website for AlfaRank, a digital systems company.

## Stack

- Astro static site
- Ready for GitHub workflow
- Ready for Cloudflare Pages deployment

## Commands

```bash
npm install
npm run dev
npm run build
```

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: 20+
- D1 binding: `DB`

## Project Requests

The Start Project form posts to:

- `POST /api/start-project`

Submissions are stored in Cloudflare D1 using:

- `migrations/0001_project_requests.sql`

Create and configure the D1 database:

```bash
npx wrangler d1 create alfarank-project-requests
npx wrangler d1 migrations apply alfarank-project-requests
```

Copy the returned `database_id` into `wrangler.toml`.

## Documentation

The development brief is stored in:

- `docs/development-brief.md`
- `docs/form-handling.md`

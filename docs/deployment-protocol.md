# Deployment Protocol

This protocol describes how AlfaRank.com is published from the local project to GitHub and Cloudflare Pages.

Secrets must never be committed to Git or printed in logs.

## 1. Check Environment

- Locate `.env`.
- Verify that GitHub and Cloudflare credentials exist.
- Do not print token values.
- Identify available variables:
  - GitHub token;
  - Cloudflare API token;
  - Cloudflare account ID;
  - optional GitHub owner/org;
  - optional repo/project names.

## 2. Verify Local Project

- Install dependencies if needed.
- Run production build.
- Run TypeScript check.
- Confirm that `dist/` is generated.
- Confirm that `.gitignore` excludes:
  - `.env`;
  - `node_modules`;
  - `dist`;
  - `.astro`;
  - local caches.

## 3. Initialize Git

- If `.git` does not exist, run `git init`.
- Set branch to `main`.
- Review changed files.
- Create the first commit.

## 4. Create GitHub Repository

- Create GitHub repository through API or GitHub CLI.
- Recommended repo name: `alfarank-site`.
- Add GitHub remote.
- Push `main`.

## 5. Create Cloudflare D1

- Create D1 database:

```bash
npx wrangler d1 create alfarank-project-requests
```

- Copy the returned `database_id` into `wrangler.toml`.
- Apply migration:

```bash
npx wrangler d1 migrations apply alfarank-project-requests
```

## 6. Create Cloudflare Pages Project

- Create Pages project connected to GitHub repository.
- Production branch: `main`.
- Build command:

```bash
npm run build
```

- Build output directory:

```text
dist
```

- Node.js version: `20+`.

## 7. Bind D1 to Pages

- Binding name:

```text
DB
```

- Database:

```text
alfarank-project-requests
```

- The Pages Function `/api/start-project` depends on this binding.

## 8. Configure Production Environment

- Add required environment variables to Cloudflare Pages if needed.
- Never upload local `.env` to Git.

## 9. Deploy

- Trigger first production deploy.
- Verify the generated Cloudflare Pages URL.
- Check:
  - `/`;
  - `/capabilities/ai-automation/`;
  - `/solutions/generate-more-content/`;
  - `/systems/content-automation-workflows/`;
  - `/start-project/`;
  - `/start-project/thank-you/`;
  - `POST /api/start-project`;
  - D1 record creation.

## 10. Finalize

- Record production URL.
- Record repository URL.
- Record D1 database name and binding.
- Add follow-up tasks:
  - `robots.txt`;
  - `sitemap.xml`;
  - Open Graph images;
  - domain connection for `AlfaRank.com`.

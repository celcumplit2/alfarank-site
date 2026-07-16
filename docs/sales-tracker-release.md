# Sales Tracker release checks

This is the focused release path for `/sales/`. It is intentionally independent
from the NOVA/LANG news synchronization.

## Local Sales Tracker check

```powershell
npm run qa:sales-release
```

This command checks the Sales Tracker source, API contracts, admin-only delete
handlers, the single client form, action workflow, custom selects, custom date
picker, XLSX export, and mobile layout safeguards. It does not run
`news:translate` or build unrelated site sections.

## Production Sales Tracker check

```powershell
npm run qa:sales-production
```

The command reads `https://alfarank.com/sales/` and verifies that the deployed
page contains the current Sales Tracker contracts. Browser screenshot QA is
still required for desktop and mobile before a production release is accepted.

## Cloudflare project check

The Cloudflare credentials for this workstation remain in the ignored old
project env file. Do not copy values into Git or print them.

```powershell
npm run qa:lead-cloudflare -- --env-file D:/ALFA/.env --project-name alfarank-site --environment production
```

Expected project settings:

- Pages project: `alfarank-site`
- production branch: `main`
- production domain: `alfarank.com`
- D1 binding: `DB`

`npm run build` is the full website build and includes NOVA/LANG news sync. A
news service failure is not a Sales Tracker failure and must be reported
separately.

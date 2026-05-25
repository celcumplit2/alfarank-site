# Development Checkpoints

## 2026-05-25 - Page load optimization checkpoint

Checkpoint commit:

- `291032f Optimize page load performance`

Repository state at checkpoint:

- Branch: `main`
- Base remote commit before local checkpoint: `d0cbffd Refine glyph cards and local Pages workflow`
- Local branch state after checkpoint: ahead of `origin/main`
- Older saved stash still present: `stash@{0}: pre-github-update-2026-05-25`

Implemented changes:

- Added `public/favicon.svg` and linked it from the shared layout.
- Removed the production-only visual lab route `/icon-variants/`.
- Simplified the first-screen liquid background, text shadows, glass shadows, blur, and backdrop effects.
- Added `content-visibility: auto` for below-the-fold sections.
- Simplified `SystemIcon` output by removing repeated SVG `defs` and gradients from every icon instance.
- Enabled `build.inlineStylesheets: "always"` in Astro to remove the render-blocking stylesheet request.
- Updated dependencies to Astro `6.3.7`, TypeScript `6.0.3`, `@astrojs/check` `0.9.9`, and current Cloudflare Workers types.
- Added `overrides.volar-service-yaml = 0.0.71` to resolve the YAML audit chain.
- Updated Node.js requirement to `22.12+`.
- Fixed the footer copyright output.
- Added `.playwright-mcp/` to `.gitignore`.

Verification at checkpoint:

- `npm audit`: 0 vulnerabilities
- `npm run build`: passed
- `npx astro check`: 0 errors, 0 warnings
- Browser smoke test: no console errors and no failed requests
- `/icon-variants/`: returns 404 after route removal

Final Lighthouse results on local production preview:

- Mobile performance: 100
- Mobile FCP: 0.7 s
- Mobile LCP: 0.8 s
- Mobile Speed Index: 0.9 s
- Mobile TBT: 0 ms
- Mobile CLS: 0
- Desktop performance: 100
- Desktop FCP: 0.2 s
- Desktop LCP: 0.2 s
- Desktop Speed Index: 0.4 s
- Total transfer size reported by Lighthouse: 9 KiB

Local development server:

- `http://127.0.0.1:4323/`


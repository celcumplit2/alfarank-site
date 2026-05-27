# AlfaRank Project Plan

Shared working plan for the next design and page development phase.

## Purpose

Turn AlfaRank.com from a complete corporate site skeleton into a stronger
digital systems company website: more concrete, more visual, more credible,
and easier to expand page by page.

This document is the reference point for future implementation decisions.
When a phase is completed, update its status and add a short note.

## Current Baseline

- Stack: Astro static site with Cloudflare Pages Functions for the project form.
- Visual system: dark liquid background, glass panels, large system glyph cards.
- Current branch state at plan creation: `main`, ahead of `origin/main`.
- Latest documented checkpoint: lead-generation landing page system checkpoint.
- Local preview target used during the checkpoint: `http://127.0.0.1:4323/`.

## Readiness Baseline - 2026-05-27

These scores are the current working baseline. Future work should improve the
score explicitly instead of treating the site as a vague "almost ready" draft.

| Area | Current score | 100% definition |
| --- | ---: | --- |
| Visual foundation | 75% | The site has a coherent premium technical style, stable global background, reusable section primitives, and page screenshots that feel intentional across desktop and mobile. |
| Block diversity | 65% | Key page families use different system-native compositions instead of repeated card shelves, with enough variants to support future client landing pages. |
| Page structure | 80% | Every page has a clear commercial journey: problem, system logic, output, related routes, proof, and conversion path. |
| Advertising LP readiness | 55% | Priority offer pages are strong enough for paid traffic: specific promise, proof, modules, FAQ, tracked CTA, and mobile-first conversion flow. |
| Forms and lead intake | 60% | Forms capture useful project context, preserve campaign attribution, handle errors clearly, and reliably store/route submissions in production. |
| SEO, metadata, indexing | 65% | Pages have unique metadata, canonical URLs, sitemap coverage, social previews, structured data where useful, and indexability checks. |
| Analytics and lead measurement | 35-45% | Traffic sources, CTA clicks, form starts, form submits, thank-you views, and lead quality signals are measured in one reporting model. |
| Production deploy readiness | 50-60% | Remote database, environment variables, Pages deployment, form submission, monitoring, rollback notes, and final smoke tests are production-verified. |
| Mobile visual QA | 60-65% | Important page sections are reviewed at real mobile widths, with no overflow, clipped copy, unreadable text, or broken visual hierarchy. |

## 100% Readiness Plan

This is the concrete plan for moving every area from the baseline score to
production-grade readiness.

### 1. Visual Foundation: 75% -> 100%

Required work:

- Lock the global background direction and document the approved background
  rules in `docs/visual-decision-library.md`.
- Make the background strong but non-competing: one global layer, section-level
  decorative layers only when they support the content, and no stacked visual
  noise.
- Define reusable CSS tokens for system surfaces, signal lines, glass panels,
  accent colors, shadows, and responsive spacing.
- Audit the first viewport and top three sections of the main page families:
  home, capabilities, solutions, systems, industries, technologies, LP, intake,
  thank-you.
- Save desktop and mobile screenshots for the final approved visual state.

Completion check:

- Browser screenshots show a consistent premium technical style on the main
  page families.
- No section feels like a generic SaaS template.
- `npm run build` passes.

### 2. Block Diversity: 65% -> 100%

Required work:

- Create a block inventory from the existing families: Mission Control, Radar,
  Command Field, Reactor, Rail, Blueprint, Console, Funnel, Before/After, Offer
  Core, and Angular Background.
- Map every repeated weak section to one of those families or to a new variant.
- Build at least 3 additional reusable variants for future landing pages:
  diagnostic map, proof console, and conversion route.
- Replace repeated card rows on lower-priority pages with page-specific
  compositions.
- Keep a screenshot comparison sheet in `artifacts/` showing reference block,
  implemented block, and target page URL.

Completion check:

- Each page family has its own recognizable visual rhythm.
- No important page uses the same generic block sequence from top to bottom.
- Mobile fallbacks remain clean and readable.

### 3. Page Structure: 80% -> 100%

Required work:

- Create a page checklist for every commercial page:
  buyer problem, why now, system mechanism, modules, proof, related routes,
  CTA, and intake context.
- Add missing proof/credibility sections where pages are still only descriptive.
- Ensure every CTA points to `/start-project/` with meaningful `offer` and
  `landing_page` parameters.
- Add stronger internal routes between capability, solution, system, industry,
  and LP pages.
- Remove dead-end page endings and replace them with a clear next action.

Completion check:

- A visitor can understand what AlfaRank builds, why it matters, and what to do
  next from every page family.
- Important pages have no vague final sections.

### 4. Advertising LP Readiness: 55% -> 100%

Required work:

- Pick the first 4 traffic-ready offers:
  `/lp/automate-lead-processing/`,
  `/lp/ai-content-workflow/`,
  `/lp/ecommerce-feed-system/`, and
  `/lp/wordpress-crm-integration/`.
- Rewrite each LP around a sharper paid-traffic promise, not a general company
  explanation.
- Add offer-specific proof blocks: before/after, concrete outputs, system
  modules, delivery process, risks avoided, and FAQ.
- Make each LP's first viewport mobile-conversion ready: strong headline,
  concise proof, CTA, and visual system cue.
- Add source-specific copy variants or sections for paid search, outreach, and
  retargeting once the base LPs are strong.

Completion check:

- Each priority LP can receive paid traffic without relying on the rest of the
  site to explain the offer.
- CTA and form tracking preserve the offer and campaign context.

### 5. Forms and Lead Intake: 60% -> 100%

Required work:

- Test every form route from LP, solution, system, industry, and direct intake
  links.
- Confirm hidden fields capture `source_path`, `landing_page`,
  `landing_offer`, `offer`, and UTM values.
- Improve validation, error copy, loading state, and success routing.
- Add spam protection that does not hurt legitimate leads.
- Add notification delivery or a reliable export path for new leads.
- Test against the production Pages Function and remote D1 database.

Completion check:

- A real production submission is stored with all campaign context.
- Failures are visible and recoverable.
- Leads can be acted on without manually inspecting the database.

### 6. SEO, Metadata, Indexing: 65% -> 100%

Required work:

- Audit unique `title`, `description`, canonical URL, and OG image coverage for
  all generated pages.
- Add structured data where useful: Organization, WebSite, BreadcrumbList, and
  selected Service/Offer pages.
- Confirm sitemap contains all intended indexable pages and excludes technical
  or duplicate routes.
- Check heading hierarchy and internal links on priority pages.
- Prepare Search Console verification and post-deploy indexing checks.

Completion check:

- Every indexable page has unique metadata and a deliberate search/social
  preview.
- Sitemap, robots, canonical, and structured data validate cleanly.

### 7. Analytics and Lead Measurement: 35-45% -> 100%

Required work:

- Choose the analytics stack and document it in the project.
- Define event taxonomy:
  page view, CTA click, LP CTA click, form start, form validation error,
  form submit success, thank-you view, and lead source.
- Persist campaign attribution from URL to form submission and analytics event.
- Add conversion events on thank-you and successful form submission.
- Build a simple reporting view or dashboard specification:
  traffic source, landing page, offer, CTA, submission, lead quality.
- Verify analytics events in production preview before public launch.

Completion check:

- Paid traffic can be evaluated by offer and source.
- Lead submissions can be tied back to page, CTA, and campaign.

### 8. Production Deploy Readiness: 50-60% -> 100%

Required work:

- Confirm remote D1 migrations are applied and match the local schema.
- Verify Cloudflare Pages environment variables and API token handling.
- Run production-preview form submissions against remote infrastructure.
- Run final build, Astro check, TypeScript check, and diff whitespace check.
- Deploy to a preview URL and run route smoke tests.
- Connect or verify the production domain.
- Document rollback, migration, and post-deploy verification steps.

Completion check:

- Production preview works end to end.
- Remote lead storage works.
- There is a clear deploy and rollback path.

### 9. Mobile Visual QA: 60-65% -> 100%

Required work:

- Test the main page families at 390px, 430px, 768px, and desktop widths.
- Check first viewport, main visual blocks, forms, CTA clusters, navigation,
  and footer.
- Fix text overflow, cramped buttons, overactive background shapes, clipped
  cards, and weak hierarchy.
- Save a final mobile screenshot set in `artifacts/`.

Completion check:

- No priority route has horizontal overflow.
- Text and buttons remain readable and tappable.
- Mobile pages feel intentionally designed, not merely collapsed from desktop.

## Priority Execution Order

1. Lock final visual foundation and mobile background behavior.
2. Finish priority LPs for the first 4 traffic routes.
3. Complete forms, lead routing, and production submission checks.
4. Add analytics and conversion measurement.
5. Run full SEO/meta/indexing audit.
6. Complete all-page desktop/mobile screenshot QA.
7. Deploy production preview, verify, then ship.

## Design Principles

- Present AlfaRank as a company that builds working digital systems, not a list
  of generic services.
- Use code-native visuals where possible: CSS, SVG, HTML structure, and reusable
  Astro components before heavy bitmap assets.
- Keep the glass/glyph visual language, but make it support system thinking:
  modules, flows, data, automation, integrations, outputs.
- Keep the interface restrained, technical, and corporate.
- Protect performance gains from the optimization checkpoint.
- Avoid decorative complexity that cannot be implemented cleanly in code.

## Roadmap

### 1. Systemic First Screen

Status: implemented draft.

Goal:

- Make the first viewport feel like an operational system layer, not only text
  and CTA buttons.

Design direction:

- Keep the main positioning text and calls to action.
- Add a code-native system visual beside or behind the hero content.
- Use connected glass modules, thin data lines, subtle flow points, and large
  background glyphs to suggest automation, data, content, CRM, APIs, and web
  platforms.
- The visual should feel like an operating console or system map, not a product
  screenshot and not a decorative illustration.

Likely implementation:

- Create a homepage-specific hero component, for example `SystemHero.astro`.
- Build the visual with HTML/CSS and inline SVG lines.
- Use existing system icon/glyph language where useful.
- Make the layout desktop-first with a responsive mobile version that stacks
  content before the system visual.

Acceptance criteria:

- First screen communicates "digital systems company" visually within the first
  viewport.
- The composition remains readable on desktop and mobile.
- The hero does not rely on a large raster image for production.
- Build passes with no new errors.
- Browser check confirms no broken layout, overlap, or console errors.

Next action:

- Review the implemented homepage hero in browser.
- Tune spacing, copy, and module routing if a stronger visual rhythm is needed.

### 2. Home Page as Navigation Hub

Status: implemented draft.

Goal:

- Make the home page a stronger router into capabilities, solutions, systems,
  technologies, industries, and project intake.

Planned changes:

- Add a "What system do you need?" decision section.
- Improve section transitions so the page reads as a connected system map.
- Keep the current card grid structure, but improve hierarchy and scanning.

Implementation note:

- Added a homepage decision hub with six operational routes into relevant
  capabilities, solutions, and system profiles.
- Added a compact system path navigation row that connects capabilities,
  solutions, systems, technologies, and project intake.
- Kept the existing card-grid sections below the hub so the home page now
  works as both a router and a catalog.

Next action:

- Review the decision hub visually after broader page review.
- Continue with roadmap item 3: strengthen the capabilities visual foundation.

### 3. Capabilities Visual Foundation

Status: implemented draft.

Goal:

- Make `/capabilities/` the main visual catalog of what AlfaRank can build.

Planned changes:

- Refine glyph card proportions if needed after the new hero direction.
- Add clearer capability categories or tags.
- Improve the relationship between capability cards and related solutions.

Implementation note:

- Added capability foundation groups for automation/operations,
  content/growth, and data/commerce.
- Connected each group to specific capabilities and solution routes.
- Kept the full glyph card catalog below the grouped operating layers.

### 4. System Profile Template

Status: implemented draft.

Goal:

- Create one excellent system profile page that becomes the template for the
  rest of `/systems/`.

Recommended first page:

- `/systems/content-automation-workflows/`

Planned sections:

- System overview.
- Input layer.
- Workflow modules.
- Automation layer.
- Output layer.
- Related capabilities.
- Start project CTA.

Implementation note:

- Added a reusable system blueprint pattern for input layer, workflow modules,
  automation layer, and output layer.
- Reworked module cards and related build-path links on system profile pages.

### 5. Solution Page Pattern

Status: implemented draft.

Goal:

- Make solution pages translate business problems into concrete systems.

Planned structure:

- Business problem.
- System that solves it.
- Core modules.
- Implementation options.
- Operational output.
- Related capabilities and systems.

Implementation note:

- Added a solution pattern section that walks from business problem to system,
  core modules, and operational output.
- Added implementation options and related system profile links.

### 6. Technologies Matrix

Status: implemented draft.

Goal:

- Turn `/technologies/` from a stack list into an implementation matrix.

Planned groups:

- Web platforms.
- AI and automation.
- Data and scraping.
- CMS and publishing.
- APIs and integrations.
- Hosting, analytics, and deployment.

Implementation note:

- Replaced the simple implementation list with a technology matrix grouped by
  function: web platforms, CMS/publishing, AI/automation, data/scraping,
  APIs/integrations, and hosting/operations.

### 7. Industries Expansion

Status: implemented draft.

Goal:

- Start with a strong overview, then expand commercially important industries
  into their own pages.

Priority candidates:

- Service businesses.
- E-commerce.
- Media and content projects.
- SaaS / MVP.

Implementation note:

- Added priority industry routes on `/industries/`.
- Added dynamic industry profile pages for all listed industries.
- Connected each industry profile to likely needs, capabilities, solutions,
  systems, and project intake.

### 8. Project Intake Upgrade

Status: implemented draft.

Goal:

- Make `/start-project/` feel like an intake system, not only a contact form.

Planned fields and logic:

- Project type.
- Current system or website.
- Business problem.
- Desired output.
- Integrations.
- Timeline.
- Budget range.
- Contact details.

Implementation note:

- Expanded `/start-project/` with company, desired output, integrations, and
  contact context fields.
- Added migration `0002_project_request_intake_fields.sql`.
- Updated the Pages Function to store the new intake fields.

### 9. SEO and Deployment Polish

Status: implemented draft.

Goal:

- Prepare the site for production growth and indexing.

Planned work:

- `robots.txt`.
- `sitemap.xml`.
- Open Graph metadata.
- Social preview image.
- Main domain connection notes.
- Optional notifications for new project requests.

Implementation note:

- Added canonical, Open Graph, and Twitter metadata in the shared layout.
- Added `robots.txt`, generated `sitemap.xml`, and an OG preview image.
- Preserved existing Cloudflare Pages static build settings.

## Lead Generation Landing Page Plan

Status: implemented draft.

Goal:

- Turn the site into a practical lead-generation asset for future advertising,
  client acquisition, and offer testing.
- Keep the broader company architecture, but add sharper commercial routes that
  a buyer can understand from a paid campaign, referral, or search visit.

Implementation pillars:

- Commercial offer pages: create focused `/lp/` landing pages for concrete
  buyer problems, each with its own hero, modules, proof signals, FAQs, and
  tracked intake form.
- Campaign routes: link the strongest offers from the home page so they are
  discoverable before paid traffic starts.
- Industry development: make industry pages act as lead-generation bridges with
  landing angles, solution routes, proof signals, and tracked intake links.
- Solution development: make solution pages explain not only the build, but
  also the campaign trigger, landing-page promise, proof to collect, and next
  conversion action.
- Conversion infrastructure: store landing page, landing offer, source path,
  and UTM values with each project request.

Initial offer pages:

- `/lp/automate-lead-processing/`
- `/lp/ai-content-workflow/`
- `/lp/ecommerce-feed-system/`
- `/lp/wordpress-crm-integration/`

Acceptance criteria:

- Landing pages have unique commercial content, proof sections, FAQs, and
  tracked intake forms.
- Home page links to the campaign offer pages.
- Solution and industry pages include lead-generation development sections.
- Project request storage accepts landing and UTM tracking fields.
- Sitemap includes the landing pages.
- Build, Astro check, TypeScript check, diff whitespace check, and browser QA
  pass before this checkpoint is considered stable.

## Visual QA and Landing Page Production Sprint

Status: in progress.

Goal:

- Turn the current visual draft into a more production-ready lead-generation
  website where every important page feels intentional, commercial, and
  visually specific.

Work plan:

- Run full-page visual QA across the 41 generated pages, not only isolated
  block crops.
- Keep the first 16 reference-driven blocks as the quality bar.
- Continue replacing weak repeated layouts with page-specific system scenes.
- Treat the weakest current blocks first: project intake, request received,
  and solution module rail.
- Strengthen commercial routing so pages guide visitors toward scoped project
  requests with useful context already attached.
- Keep screenshot evidence for before/after comparisons in `artifacts/`.

Acceptance criteria:

- The site builds without errors.
- Updated weak blocks have fresh screenshots.
- The new screenshots are compared against both the old spread-template set
  and the first 16 reference set.
- Remaining weak areas are named explicitly instead of hidden in a vague
  "looks good" report.

## Working Log

### 2026-05-25

- Created this project plan.
- First active design task: systemic first screen.
- Generated a visual reference for the first screen direction.
- Implemented a code-native homepage `SystemHero` with connected glass modules,
  SVG routing lines, and a responsive mobile module grid.
- Extended the same system-map visual language to all internal page heroes by
  upgrading the shared `PageHero` component.

### 2026-05-26

- Upgraded internal page heroes from a shared generic mini-map to configurable
  page-specific system maps with unique nodes, metrics, icons, routes, and
  visual modes.
- Implemented roadmap item 2 as a draft by adding the homepage decision hub and
  system path navigation.
- Implemented roadmap items 3-9 as drafts: capabilities foundation, system
  profile template, solution page pattern, technology matrix, industry profile
  expansion, project intake upgrade, and SEO/deployment polish.
- Fixed the next commercial plan as a lead-generation landing page system and
  implemented the first draft: `/lp/` offer pages, campaign offer links,
  solution/industry proof sections, sitemap coverage, and project request
  tracking fields.

### 2026-05-27

- Started the visual QA and landing page production sprint.
- Priority implementation target: strengthen the three weakest blocks from the
  screenshot audit before moving to full-page QA.

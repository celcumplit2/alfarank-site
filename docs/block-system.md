# AlfaRank Block System

Internal rules for building AlfaRank pages from reusable system blocks.

This document turns the approved visual direction into a repeatable site
language. The goal is not to copy one block everywhere. The goal is to choose a
layout model that makes the business message stronger.

## Current Site Count

Current static build output contains 41 HTML pages, excluding `sitemap.xml`.

Page families:

- Home: 1 page.
- About: 1 page.
- Technologies: 1 page.
- Capabilities: 8 pages, including index plus 7 capability detail pages.
- Solutions: 8 pages, including index plus 7 solution detail pages.
- Systems: 7 pages, including index plus 6 system detail pages.
- Industries: 9 pages, including index plus 8 industry detail pages.
- Landing pages: 4 pages.
- Intake: 2 pages, start project plus thank-you.

## Implemented Reference Blocks

The first block implementation pass created 16 reference-backed blocks:

| # | Block | Primary URL | Block family |
|---|---|---|---|
| 1 | Capability Command Field | `/` | Command Field |
| 2 | Technology Orbit | `/technologies/` | Orbit / Radar |
| 3 | Problem To System Route | `/solutions/` | Route Engine |
| 4 | Client System Blueprint | `/` | Blueprint |
| 5 | Lead Reactor | `/lp/automate-lead-processing/` | Reactor |
| 6 | Content Factory Rail | `/lp/ai-content-workflow/` | Pipeline / Rail |
| 7 | Data Signal Map | `/capabilities/data-systems-scraping/` | Signal Map |
| 8 | Commerce Control Deck | `/lp/ecommerce-feed-system/` | Deck |
| 9 | Automation Tower | `/capabilities/ai-automation/` | Tower / Stack |
| 10 | Platform Blueprint | `/lp/wordpress-crm-integration/` | Blueprint |
| 11 | AI Review Console | `/capabilities/video-media-automation/` | Console |
| 12 | Growth Signal Funnel | `/industries/` | Funnel |
| 13 | Mission Control Hero | `/` | Mission Control |
| 14 | Before / After Engine | `/lp/*` | Before / After |
| 15 | Landing Page Offer Core | `/` | Offer Core |
| 16 | Service Navigation Surface | `/capabilities/` | Navigation Surface |

Reference screenshots:

- Source boards: `artifacts/reference-blocks/`
- Cropped references: `artifacts/reference-block-crops/`
- Implementation screenshots: `artifacts/block-implementation/`

## Block Asset Primitives

Every future block should be assembled from these primitives instead of
starting from a generic card grid.

### Core

The central operating object of the block.

Use for:

- AlfaRank core.
- System engine.
- Integration core.
- Route engine.
- Signal processor.
- Offer core.

Rules:

- The core explains what the block does.
- It usually contains one icon, one short status label, one strong statement,
  one short paragraph, and sometimes one CTA.
- The core may sit in the center, left rail, top command area, or lower dock,
  but it must have a clear role.

CSS primitive:

- `.ar-system-core`

### Node

A linked or interactive operating zone around the core.

Use for:

- Capability links.
- Technology chips.
- Offer links.
- Workflow stages.
- Data sources.
- Output modules.

Rules:

- Nodes should be specific, not generic.
- Use short labels and real page links where possible.
- A node can include icon, status, title, detail, and metric/progress.

CSS primitive:

- `.ar-system-node`

### Connector

The visual path that says "these things are part of one system".

Use for:

- Lines between nodes and core.
- Rings/orbits.
- Rails.
- Timeline beams.
- Flow arrows.

Rules:

- Connectors must support meaning. Do not add lines as decoration only.
- Hide or simplify connectors on mobile.

CSS primitive:

- `.ar-connector-field`

### Signal

A compact state, status, or measurable output.

Use for:

- Active, Syncing, Ready, Review, Publish, Live.
- Problem, Capability, System route.
- Rights clear, Brand fit, Ready to publish.

Rules:

- Signals are not buttons.
- Keep them short.
- Use them to make an abstract service feel operational.

CSS primitives:

- `.ar-signal-strip`
- `.ar-signal`

### Metric

A progress or readiness bar.

Use for:

- Capability level.
- Workflow completion.
- Data quality.
- Build direction strength.

Rules:

- A metric bar should hint at readiness, coverage, or flow.
- Do not fake business KPIs unless the page has real data.

CSS primitive:

- `.ar-metric-bar`

### Dock

A bottom or side summary layer.

Use for:

- Telemetry links.
- Conversion signals.
- Output tags.
- Related routes.

Rules:

- Docks summarize where the block leads next.
- They work especially well when the main block is visually dense.

CSS primitive:

- `.ar-system-dock`

### Panel

A larger framed operating surface.

Use for:

- Consoles.
- Blueprints.
- Review panels.
- Dashboards.
- Control decks.

Rules:

- Panels should feel like working software, not marketing cards.
- Put real stages, states, or outputs inside the panel.

CSS primitive:

- `.ar-system-panel`

## Block Families

### Mission Control

Use when the page must say "AlfaRank coordinates the whole system".

Best for:

- Home hero.
- About hero.
- High-level system overview pages.

Pattern:

- Large message.
- System map or command surface.
- Linked nodes around a core.
- Small telemetry dock.

### Orbit / Radar

Use when the message is about technologies, tools, or layers that surround a
core logic.

Best for:

- Technologies.
- Capability overviews.
- Stack explanations.

Pattern:

- Central core.
- Rings/orbits.
- Linked chips or nodes.
- Minimal explanatory copy.

### Command Field

Use when the page is a map of directions or choices.

Best for:

- Capabilities overview.
- Home capability section.
- Service navigation.

Pattern:

- Central decision core.
- Asymmetric linked zones.
- Connector grid.
- Level bars.

### Reactor

Use when the page converts inputs into outputs.

Best for:

- Lead processing.
- Intake flows.
- Request routing.
- Data intake.

Pattern:

- Inputs on one side.
- Processing core in the middle.
- Outputs on the other side.

### Pipeline / Rail

Use when the page describes repeated production.

Best for:

- Content workflows.
- Media production.
- Publishing processes.
- Implementation steps.

Pattern:

- Sequential stations.
- A visible rail.
- Stage numbers or status labels.

### Blueprint

Use when the page is about architecture or integration.

Best for:

- WordPress/API/CRM.
- Web platform pages.
- Product/interface pages.
- System profile pages.

Pattern:

- Layers.
- Hub or integration core.
- Offset panels.
- Connector grid.

### Console / Deck

Use when the page is about review, monitoring, dashboards, or operations.

Best for:

- Media review.
- Data monitoring.
- E-commerce operations.
- Internal tools.

Pattern:

- Large preview or control panel.
- Queue/list of actions.
- Status strip or quality checks.

### Funnel

Use when market, industry, or acquisition signals become a system scope.

Best for:

- Industries index.
- Industry detail pages.
- Campaign planning sections.

Pattern:

- Inputs from multiple contexts.
- Central growth/system core.
- Output tags or conversion routes.

### Before / After

Use when the page needs to sell the business value quickly.

Best for:

- Landing pages.
- Solution pages.
- Industry pages.

Pattern:

- Before state.
- Transformation core.
- After state.
- Measurable signals.

### Offer Core

Use when a page must direct users into commercial offers.

Best for:

- Home campaign section.
- Solution pages with campaign routes.
- Industry pages with offer angles.

Pattern:

- Lead acquisition or offer core.
- Linked offer nodes around it.
- Conversion signal dock.

## Selection Rules

Choose the block family from the meaning of the page:

- If the page explains integrations, use Blueprint.
- If the page explains leads or intake, use Reactor.
- If the page explains content production, use Pipeline / Rail.
- If the page explains data, use Signal Map, Console, or Deck.
- If the page explains technology, use Orbit / Radar.
- If the page is a catalog or navigation page, use Command Field or Navigation
  Surface.
- If the page is for paid traffic or future sales, use Before / After and Offer
  Core.
- If the page is high-level brand positioning, use Mission Control.

Avoid:

- Repeating the same block family twice in a row on one page.
- Making a page from only card grids.
- Using visual lines that do not explain a relationship.
- Treating every page as a hero plus generic cards.

## Page Composition Rules

Every important page should have:

- One page-specific hero visual.
- One primary mechanism block that carries the page idea.
- One secondary block from a different family.
- One conversion or next-route layer.

Ordinary cards are allowed only as secondary support.

## Spread Plan For Remaining Pages

The 16 blocks are implemented. The next work is to spread the system language
to the remaining template areas.

Priority 1:

- Solution detail template: add Before / After or Reactor variants by solution.
- System detail template: add Blueprint, Console, or Pipeline variants by system
  type.
- Industry detail template: add Funnel plus Offer Core route.

Priority 2:

- About page: upgrade to Mission Control / operating principles.
- Start Project page: upgrade form context into Intake Reactor.
- Thank-you page: add next-route Dock.

Priority 3:

- Capability detail pages not yet specialized:
  - Web & Product Development -> Blueprint.
  - SEO & Content Infrastructure -> Pipeline / Rail.
  - E-commerce Systems -> Commerce Deck or Catalog Console.
  - WordPress & API Integrations -> Blueprint.

## Acceptance Criteria For Future Blocks

Every new block should pass:

- It has a named block family.
- It uses real page data, not filler.
- Important nodes are links when they naturally route somewhere.
- Mobile collapses into a stable grid.
- No horizontal overflow at 390px and 1440px viewport widths.
- The block makes the page message clearer by its layout.
- The block does not duplicate the immediately previous page section shape.


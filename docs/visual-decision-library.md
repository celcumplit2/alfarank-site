# Visual Decision Library

Internal visual decisions for AlfaRank.com.

For the broader page/block system, use:

```text
docs/block-system.md
```

## Global Angular Background

Decision date: 2026-05-27

Status: approved as the current site-wide background direction.

## Direction

The global site background uses the lower-left reference direction from the
background exploration: large diagonal glass planes, architectural depth,
subtle grid structure, and cyan signal edges.

The background should make AlfaRank feel like a future-facing systems company
without becoming a foreground illustration.

## Base Rules

- Use one global background layer through `.liquid-background`.
- Keep decorative planes behind all page content.
- Do not stack extra page-level glow fields on top of the global background
  unless a section needs a specific system scene.
- Keep the left reading column calmer than the visual side of the page.
- Use masks to reduce plane strength behind large headings and form fields.
- Keep the palette in deep navy, cyan, teal, and subtle blue.
- Avoid purple-heavy gradients, beige, brown, orange, and decorative orbs.
- Mobile must keep the same direction, but with lower opacity and less visual
  pressure around the headline and primary CTA.
- If readability drops, reduce plane opacity or shift masks before darkening
  cards or adding new panels.

## Implementation Notes

Current implementation:

- `src/components/LiquidBackground.astro` renders the single fixed background
  node.
- `src/styles/global.css` owns the angular plane composition through
  `.liquid-background`, `.liquid-background::before`, and
  `.liquid-background::after`.
- The mobile override lives in the `max-width: 560px` media query.

Reference QA artifacts:

```text
artifacts/background-qa/
```

## Liquid Glass Cards With Background Glyphs

Decision date: 2026-05-22

Status: approved for page-level testing.

## Direction

System icons should not behave like small badges placed before text. For
capability, solution, and system cards, icons can become large background glyphs
inside the glass block.

The goal is to make every card feel like a transparent technical panel with a
system mark embedded into the glass layer.

## Base Rules

- Use the icon as a large background glyph, not as a foreground badge.
- Keep the glyph behind text.
- Use blue/cyan contour lines.
- Remove the icon's internal tile/glass box in background mode.
- Keep the full glyph inside the card object. The icon is a background element
  of the card, not an oversized shape randomly cut by card boundaries.
- Text sits above the glyph. The icon may pass behind the text area, but it must
  remain subtle enough not to reduce readability.
- Avoid overly dark card fills on the already dark-blue background. The card
  layer should stay light enough to feel like glass over water, not a dark
  panel.
- Keep glyph cards almost transparent. If contrast is weak, darken the shared
  liquid background layer, not the card fill.
- Keep text white with shadow on a separate reading layer.
- Use low-to-medium opacity by default and increase clarity on hover.
- Do not use a bottom `Open` label on glyph cards. The whole card is the link.
- Use two or three short trigger tags at the bottom of the card instead. Tags
  should read like quiet hashtag triggers, not buttons.
- Hover must not introduce an extra inner background tile, badge, or visible
  icon container.
- Do not use generic app icons, emoji, or filled colorful icons.

## Approved Layout Types

### Type 4: Diagonal Technical Mark

Use for:

- data systems;
- scraping;
- monitoring;
- ranking;
- audit systems.

Behavior:

- oversized glyph;
- diagonal or angled placement;
- usually top-right or crossing the right side;
- should feel technical and directional.

Risk:

- can become too aggressive if used everywhere.

## Type 5: Large Object Mark

Use for:

- e-commerce;
- concrete business systems;
- cards where the icon should stay very readable.

Behavior:

- large recognizable glyph;
- positioned right or right-bottom;
- partially cropped;
- less abstract than Type 4.

Risk:

- can feel too literal if overused.

## Type 6: Full-Bleed System Glyph

Use as the default card treatment.

Use for:

- AI automation;
- web platforms;
- content infrastructure;
- media pipelines;
- integrations;
- general system cards.

Behavior:

- large glyph fills most of the card;
- fully contained inside the card;
- soft blue contour lines;
- text remains readable in front;
- strongest candidate for the default AlfaRank card system.

Risk:

- if opacity is too low, the glyph disappears;
- if stroke is too heavy, the glyph becomes foreground.
- if the glyph is pushed outside the card, it reads as an accidental cropped
  fragment instead of a background system mark.

## Split Fragments

Use selectively for workflow or systems pages where a single icon feels too
static.

Behavior:

- two enlarged glyph fragments in opposite corners;
- good for automation/workflow cards;
- creates depth without centering one logo-like mark.

## Contour Mesh

Use selectively for internal tools, integrations, or abstract infrastructure.

Behavior:

- repeated contour glyphs form a technical pattern;
- should stay subtle;
- useful when the card needs texture rather than one primary symbol.

## Implementation Notes

Current implementation approach:

- `CardGrid` supports a `glyph` visual variant.
- The regular small icon layout remains available for pages that still need it.
- `/capabilities/` is the first real page used to test the glyph card system.

Default mapping:

- `data`, `monitor`, `ranking` -> Type 4 diagonal.
- `commerce` -> Type 5 large object.
- all other capability cards -> Type 6 full-bleed.

The preview board remains available at:

```text
/icon-variants/
```

Reference artifacts from the browser diff cycle:

```text
artifacts/icon-variants/current-v7.png
artifacts/icon-variants/diff-v7.png
```

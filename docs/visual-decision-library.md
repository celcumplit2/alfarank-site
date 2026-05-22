# Visual Decision Library

Internal visual decisions for AlfaRank.com.

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
- Clip the glyph through the card edges with `overflow: hidden`.
- Keep most of the glyph inside the card; cropping should feel intentional, not
  like a random cut-off fragment.
- Avoid overly dark card fills on the already dark-blue background. The card
  layer should stay light enough to feel like glass over water, not a dark
  panel.
- Keep text white with shadow on a separate reading layer.
- Use low-to-medium opacity by default and increase clarity on hover.
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
- may be slightly cropped by the card edge, but should remain mostly readable;
- soft blue contour lines;
- text remains readable in front;
- strongest candidate for the default AlfaRank card system.

Risk:

- if opacity is too low, the glyph disappears;
- if stroke is too heavy, the glyph becomes foreground.
- if the glyph is pushed too far out of the card, it reads as an accidental
  cropped fragment instead of a background system mark.

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

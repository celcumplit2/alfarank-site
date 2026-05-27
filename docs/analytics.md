# AlfaRank Analytics Plan

## Measurement Layer

The site uses a lightweight first-party measurement layer in
`src/layouts/Layout.astro`.

Events are pushed to:

- `window.dataLayer` for Google Tag Manager or another tag manager.
- `window.gtag`, if Google Analytics is loaded later.
- `window.plausible`, if Plausible is loaded later.
- `window` as an `alfarank:analytics` custom event for browser QA.

No external analytics vendor is required for the site to run.

## Current Events

- `page_view`
- `cta_click`
- `form_start`
- `form_validation_error`
- `form_submit_click`
- `form_submit_attempt`
- `thank_you_view`

## Shared Properties

Each event includes an `alfarank` object with:

- `path`
- `source_path`
- `landing_page`
- `landing_offer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

Form events also include:

- `form`
- `project_type`
- `desired_output`

## Conversion Reading

Primary conversion:

- `thank_you_view`

Supporting funnel events:

- `cta_click`
- `form_start`
- `form_validation_error`
- `form_submit_attempt`

Recommended reporting dimensions:

- landing page;
- landing offer;
- UTM source / medium / campaign;
- CTA label and destination;
- form type;
- project type;
- desired output.

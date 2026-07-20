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

## QA Gate

Run the analytics audit before preview or production traffic:

```bash
npm run qa:lead-analytics
```

The command builds the site and verifies the event inventory, shared conversion
context, form attribution fields, optional vendor forwarding hooks, localized
thank-you pages, and partner-program attribution in the generated output.

## Optional Vendor Scripts

The first-party event layer can forward events to production analytics when
these build-time environment variables are present:

- `PUBLIC_GTM_ID`: injects Google Tag Manager and pushes events to
  `window.dataLayer`.
- `PUBLIC_GA_ID` or `PUBLIC_GA_MEASUREMENT_ID`: injects GA4 `gtag` with automatic page views disabled, so the
  site's own `page_view` event remains the source of truth.
- `PUBLIC_PLAUSIBLE_DOMAIN`: injects Plausible.
- `PUBLIC_PLAUSIBLE_SRC`: optional Plausible script URL override. Defaults to
  `https://plausible.io/js/script.js`.

The site still works without these variables. In that case events remain
available through `window.dataLayer` and the `alfarank:analytics` browser event
for QA.

## Current Events

- `page_view`
- `cta_click`
- `form_start`
- `form_validation_error`
- `form_submit_click`
- `form_submit_attempt`
- `verified_lead_submit`
- `quick_contact_click`

## Shared Properties

Each event includes an `alfarank` object with:

- `path`
- `lead_id`
- `source_path`
- `landing_page`
- `landing_offer`
- `form_variant`
- `locale`
- `referrer`
- `lead_channel`
- `partner_ref`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

Form events also include:

- `form`
- `form_variant`
- `project_type`
- `desired_output`

Quick contact events also include:

- `channel`
- `label`
- `href`
- `location`

## Conversion Reading

Primary conversion:

- `verified_lead_submit`

On successful project request submissions, the thank-you redirect preserves
non-PII conversion context in the URL: `lead_id`, `source_path`,
`landing_page`, `landing_offer`, `form_variant`, `locale`, `lead_channel`,
`partner_ref`, and UTM parameters. This lets the `verified_lead_submit` event tie the
conversion back to the originating page, campaign, form, language, and
partner/referral code without exposing the submitter's name, email, referrer,
or project details in the URL.

The URL is not proof of conversion. A successful submission also creates a
short-lived `HttpOnly` cookie containing a random one-time token whose SHA-256
hash is stored with the lead. The thank-you page sends the `lead_id` to
`POST /api/lead-conversion`; the endpoint atomically accepts the matching token
only when `conversion_recorded_at` is still empty. Only a verified response
pushes `verified_lead_submit` to the data layer. Missing cookies, copied URLs,
mismatched IDs, and replays do not emit the conversion event.

Supporting funnel events:

- `cta_click`
- `form_start`
- `form_validation_error`
- `form_submit_attempt`
- `quick_contact_click`

Recommended reporting dimensions:

- landing page;
- landing offer;
- form variant;
- locale;
- lead channel;
- partner/referral code;
- UTM source / medium / campaign;
- CTA label and destination;
- form type;
- project type;
- desired output.

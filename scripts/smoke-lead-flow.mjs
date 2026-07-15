const baseUrl = (process.env.LEAD_SMOKE_BASE_URL || "http://127.0.0.1:8788").replace(/\/+$/, "");
const reportToken = process.env.LEAD_REPORT_TOKEN || process.env.LEAD_SMOKE_REPORT_TOKEN || "";
const turnstileToken = process.env.LEAD_SMOKE_TURNSTILE_TOKEN || "";
const runId = process.env.LEAD_SMOKE_RUN_ID || String(Date.now());
const requireReport = process.env.LEAD_SMOKE_REQUIRE_REPORT === "1" || process.argv.includes("--require-report");
const requireNotificationEvents = process.env.LEAD_SMOKE_EXPECT_NOTIFICATION_EVENTS === "1";

const cases = [
  {
    locale: "en",
    prefix: "",
    formVariant: "start-project",
    sourcePath: "/start-project/",
    offer: "smoke-lead-en",
    projectType: "AI automation",
    problem: "Need to route paid lead requests into one follow-up workflow.",
    result: "A working lead intake, scoring, and routing path.",
    output: "Lead routing dashboard",
    integrations: "CRM, email",
    source: "google",
    medium: "cpc",
    campaign: "lead-smoke-en",
    partner: ""
  },
  {
    locale: "ru",
    prefix: "/ru",
    formVariant: "lp:ai-content-workflow:quick",
    sourcePath: "/ru/lp/ai-content-workflow/",
    offer: "smoke-lead-ru",
    projectType: "SEO content workflow",
    problem: "Нужно быстрее выпускать и проверять контент без ручного хаоса.",
    result: "Понятный маршрут публикации и контроля качества.",
    output: "Контентный маршрут",
    integrations: "CMS, analytics",
    source: "newsletter",
    medium: "email",
    campaign: "lead-smoke-ru",
    partner: ""
  },
  {
    locale: "ro",
    prefix: "/ro",
    formVariant: "partner-program",
    sourcePath: "/ro/partner-program/",
    offer: "partner-program",
    projectType: "Partner referral",
    problem: "Partner wants to send data automation clients to AlfaRank.",
    result: "A clear partner qualification route.",
    output: "Partner lead workflow",
    integrations: "CRM",
    source: "partner",
    medium: "referral",
    campaign: "lead-smoke-ro",
    partner: `smoke-${runId}`
  }
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function localizedThankYouPath(testCase) {
  return `${testCase.prefix}/start-project/thank-you/` || "/start-project/thank-you/";
}

function formPayload(testCase) {
  const sourcePath = testCase.sourcePath || `${testCase.prefix}/start-project/` || "/start-project/";
  const email = `lead-smoke-${runId}-${testCase.locale}@example.com`;
  const body = new URLSearchParams({
    name: `Lead Smoke ${testCase.locale.toUpperCase()}`,
    email,
    company: "AlfaRank QA",
    project_type: testCase.projectType,
    current_system: "Manual intake",
    business_problem: testCase.problem,
    desired_result: testCase.result,
    desired_output: testCase.output,
    integrations: testCase.integrations,
    budget: "QA",
    timeline: "QA",
    contact_details: "Smoke test only",
    source_path: sourcePath,
    landing_page: sourcePath,
    landing_offer: testCase.offer,
    form_variant: testCase.formVariant,
    locale: testCase.locale,
    referrer: `${baseUrl}${testCase.prefix || ""}/`,
    lead_channel: "",
    partner_ref: testCase.partner,
    utm_source: testCase.source,
    utm_medium: testCase.medium,
    utm_campaign: testCase.campaign,
    utm_term: "qa",
    utm_content: runId,
    company_website: ""
  });

  if (turnstileToken) {
    body.set("cf-turnstile-response", turnstileToken);
  }

  return {
    email,
    body
  };
}

async function submitLead(testCase) {
  const { email, body } = formPayload(testCase);
  const response = await fetch(`${baseUrl}/api/start-project`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body,
    redirect: "manual"
  });

  assert(
    response.status === 303 || response.status === 302,
    `${testCase.locale}: expected redirect, got ${response.status}`
  );

  const location = response.headers.get("location") || "";
  const expectedPath = localizedThankYouPath(testCase);

  assert(location.includes(expectedPath), `${testCase.locale}: redirect does not include ${expectedPath}`);
  assert(location.includes("lead_id="), `${testCase.locale}: redirect is missing lead_id`);
  assert(location.includes(`locale=${testCase.locale}`), `${testCase.locale}: redirect is missing locale`);

  const leadId = new URL(location, baseUrl).searchParams.get("lead_id") || "";
  const formVariant = new URL(location, baseUrl).searchParams.get("form_variant") || "";
  assert(formVariant === testCase.formVariant, `${testCase.locale}: redirect is missing form_variant`);

  const conversionCookie = response.headers.get("set-cookie") || "";
  assert(
    conversionCookie.includes("alfarank_lead_conversion="),
    `${testCase.locale}: redirect is missing one-time conversion cookie`
  );

  return { ...testCase, email, leadId, location, conversionCookie: conversionCookie.split(";", 1)[0] };
}

async function verifyConversionProof(submission) {
  const endpoint = new URL("/api/lead-conversion", baseUrl);
  endpoint.searchParams.set("lead_id", submission.leadId);

  const withoutCookie = await fetch(endpoint, { method: "POST" });
  assert(withoutCookie.ok, `${submission.locale}: conversion check without cookie failed`);
  assert(
    (await withoutCookie.json())?.verified === false,
    `${submission.locale}: lead id alone incorrectly verified a conversion`
  );

  const verified = await fetch(endpoint, {
    method: "POST",
    headers: { cookie: submission.conversionCookie }
  });
  assert(verified.ok, `${submission.locale}: valid conversion proof failed`);
  assert(
    (await verified.json())?.verified === true,
    `${submission.locale}: valid conversion proof was rejected`
  );

  const replay = await fetch(endpoint, {
    method: "POST",
    headers: { cookie: submission.conversionCookie }
  });
  assert(replay.ok, `${submission.locale}: replay conversion check failed`);
  assert(
    (await replay.json())?.verified === false,
    `${submission.locale}: conversion proof was accepted more than once`
  );
}

async function updateLeadStatus(submission) {
  if (!reportToken) return null;

  const url = new URL(`${baseUrl}/api/lead-status`);
  url.searchParams.set("token", reportToken);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      id: submission.leadId,
      status: "contacted",
      owner: "qa",
      note: `Smoke lifecycle check ${runId}`,
      next_action: "qa_verified_follow_up"
    })
  });

  assert(response.ok, `lead status update expected 200, got ${response.status}`);
  const payload = await response.json();
  assert(payload?.updated === true, "lead status update did not confirm update");
  assert(payload?.lead?.status === "contacted", "lead status update did not return contacted lead");
  assert(payload?.status_event?.status === "contacted", "lead status update did not return lifecycle status event");
  assert(payload?.status_event?.previous_status, "lead status event is missing previous_status");
  return payload;
}

async function fetchReport(params = {}) {
  if (!reportToken) return null;

  const url = new URL(`${baseUrl}/api/lead-report`);
  url.searchParams.set("token", reportToken);
  url.searchParams.set("limit", "50");
  url.searchParams.set("include_test", "1");
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  const response = await fetch(url);
  assert(response.ok, `lead report expected 200, got ${response.status}`);

  return response.json();
}

async function fetchExport(params = {}) {
  if (!reportToken) return null;

  const url = new URL(`${baseUrl}/api/lead-export`);
  url.searchParams.set("token", reportToken);
  url.searchParams.set("limit", "50");
  url.searchParams.set("include_test", "1");
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  const response = await fetch(url);
  assert(response.ok, `lead export expected 200, got ${response.status}`);

  const contentType = response.headers.get("content-type") || "";
  assert(contentType.includes("text/csv"), "lead export did not return CSV");

  return response.text();
}

function verifyReport(report, submissions, lifecycleLead, lifecycleEvent) {
  if (!report) return;

  const recent = Array.isArray(report.recent_leads) ? report.recent_leads : [];
  const emails = new Set(recent.map((lead) => lead.email));

  submissions.forEach((submission) => {
    assert(emails.has(submission.email), `lead report is missing ${submission.email}`);
  });

  assert(report.breakdowns?.by_channel?.length > 0, "lead report is missing channel breakdown");
  assert(report.breakdowns?.by_locale?.length > 0, "lead report is missing locale breakdown");
  assert(report.breakdowns?.by_status?.length > 0, "lead report is missing status breakdown");
  assert(report.breakdowns?.by_priority?.length > 0, "lead report is missing priority breakdown");
  assert(report.breakdowns?.by_bucket?.length > 0, "lead report is missing routing bucket breakdown");
  assert(report.breakdowns?.by_offer?.length > 0, "lead report is missing offer breakdown");
  assert(report.breakdowns?.by_form_variant?.length > 0, "lead report is missing form variant breakdown");
  assert(report.breakdowns?.by_utm_source?.length > 0, "lead report is missing UTM source breakdown");
  assert(report.breakdowns?.by_utm_medium?.length > 0, "lead report is missing UTM medium breakdown");
  assert(report.breakdowns?.by_utm_campaign?.length > 0, "lead report is missing UTM campaign breakdown");
  assert(report.breakdowns?.by_partner?.length > 0, "lead report is missing partner breakdown");
  assert(report.breakdowns?.by_sla?.length > 0, "lead report is missing response SLA breakdown");
  assert(report.breakdowns?.by_follow_up_sla?.length > 0, "lead report is missing follow-up SLA breakdown");
  assert(report.partner_performance, "lead report is missing partner performance summary");
  assert(report.partner_performance?.totals, "lead report is missing partner performance totals");
  assert(Array.isArray(report.partner_performance?.sources), "lead report is missing partner performance sources");
  assert(report.source_performance, "lead report is missing source performance summary");
  assert(Array.isArray(report.source_performance?.channels), "lead report is missing channel performance rows");
  assert(Array.isArray(report.source_performance?.offers), "lead report is missing offer performance rows");
  assert(Array.isArray(report.source_performance?.form_variants), "lead report is missing form variant performance rows");
  assert(Array.isArray(report.source_performance?.utm_sources), "lead report is missing UTM source performance rows");
  assert(Array.isArray(report.source_performance?.utm_campaigns), "lead report is missing UTM campaign performance rows");
  assert("overdue_count" in (report.totals || {}), "lead report totals are missing overdue_count");
  assert("due_soon_count" in (report.totals || {}), "lead report totals are missing due_soon_count");
  assert("follow_up_stale_count" in (report.totals || {}), "lead report totals are missing follow_up_stale_count");
  assert("follow_up_due_soon_count" in (report.totals || {}), "lead report totals are missing follow_up_due_soon_count");
  assert("active_count" in (report.totals || {}), "lead report totals are missing active_count");
  assert("contacted_count" in (report.totals || {}), "lead report totals are missing contacted_count");
  assert("qualified_or_better_count" in (report.totals || {}), "lead report totals are missing qualified_or_better_count");
  assert("won_count" in (report.totals || {}), "lead report totals are missing won_count");
  assert("needs_owner_count" in (report.totals || {}), "lead report totals are missing needs_owner_count");
  assert("needs_next_action_count" in (report.totals || {}), "lead report totals are missing needs_next_action_count");
  assert(Array.isArray(report.action_queue), "lead report is missing action queue");
  assert(
    report.action_queue.length === 0 || report.action_queue.some((lead) => lead.business_problem && lead.desired_result),
    "action queue is missing lead follow-up context"
  );
  assert(Array.isArray(report.status_events), "lead report is missing lifecycle status events");
  assert(Array.isArray(report.notification_events), "lead report is missing notification delivery events");

  const partnerSubmission = submissions.find((submission) => submission.partner);
  const utmSources = new Set(report.breakdowns.by_utm_source.map((row) => row.utm_source));
  const formVariants = new Set(report.breakdowns.by_form_variant.map((row) => row.form_variant));
  const locales = new Set(report.breakdowns.by_locale.map((row) => row.locale));
  const performanceSources = new Set(report.source_performance.utm_sources.map((row) => row.utm_source));
  const performanceFormVariants = new Set(report.source_performance.form_variants.map((row) => row.form_variant));
  const performanceCampaigns = new Set(report.source_performance.utm_campaigns.map((row) => row.utm_campaign));
  submissions.forEach((submission) => {
    assert(utmSources.has(submission.source), `lead report is missing UTM source ${submission.source}`);
    assert(formVariants.has(submission.formVariant), `lead report is missing form variant ${submission.formVariant}`);
    assert(locales.has(submission.locale), `lead report is missing locale ${submission.locale}`);
    assert(performanceSources.has(submission.source), `lead source performance is missing UTM source ${submission.source}`);
    assert(performanceFormVariants.has(submission.formVariant), `lead source performance is missing form variant ${submission.formVariant}`);
    assert(performanceCampaigns.has(submission.campaign), `lead source performance is missing UTM campaign ${submission.campaign}`);
  });

  if (partnerSubmission) {
    const partnerRefs = new Set(report.breakdowns.by_partner.map((row) => row.partner_ref));
    assert(
      partnerRefs.has(partnerSubmission.partner),
      `lead report is missing partner ref breakdown for ${partnerSubmission.partner}; got ${[...partnerRefs].join(", ")}`
    );
    const partnerSources = new Set(report.partner_performance.sources.map((row) => row.partner_ref));
    assert(
      partnerSources.has(partnerSubmission.partner),
      `lead report is missing partner performance source for ${partnerSubmission.partner}; got ${[...partnerSources].join(", ")}`
    );
    assert(Number(report.partner_performance.totals.total || 0) >= 1, "partner performance did not count partner leads");
    assert("qualified_or_better_count" in report.partner_performance.totals, "partner performance totals are missing qualified_or_better_count");
    assert("unknown_ref_count" in report.partner_performance.totals, "partner performance totals are missing unknown_ref_count");
  }

  if (lifecycleLead) {
    const updatedLead = recent.find((lead) => lead.id === lifecycleLead.id);
    assert(updatedLead?.status === "contacted", "lead report did not include updated lifecycle status");
    assert(updatedLead?.lead_owner === "qa", "lead report did not include lifecycle owner");
    assert(updatedLead?.needs_owner === 0, "lead report did not clear needs_owner after owner assignment");
    assert(updatedLead?.needs_next_action === 0, "lead report did not clear needs_next_action after next action assignment");
    assert(updatedLead?.response_sla === "touched", "lead report did not include touched SLA state");
    assert(updatedLead?.follow_up_sla === "on_track", "lead report did not include follow-up SLA state");
    assert(
      updatedLead?.follow_up_age_hours !== undefined && updatedLead?.follow_up_age_hours !== null,
      "lead report did not include follow-up age hours"
    );
    assert(Number(report.totals.contacted_count || 0) >= 1, "lead report did not count contacted leads");

  }

  if (lifecycleEvent) {
    const reportedEvent = report.status_events.find((event) => event.id === lifecycleEvent.id);
    assert(reportedEvent, "lead report did not include lifecycle status event history");
    assert(reportedEvent.lead_id === lifecycleEvent.lead_id, "lead status event history has wrong lead id");
    assert(reportedEvent.status === "contacted", "lead status event history has wrong status");
    assert(reportedEvent.previous_status === lifecycleEvent.previous_status, "lead status event history has wrong previous status");
    assert(reportedEvent.owner === "qa", "lead status event history is missing owner");
    assert(reportedEvent.next_action === "qa_verified_follow_up", "lead status event history is missing next action");
  }

  if (requireNotificationEvents) {
    const notificationEvents = report.notification_events;
    const deliveryChannels = new Set(["webhook", "telegram"]);
    const createdEvents = notificationEvents.filter(
      (event) => event.event_type === "project_request.created" && deliveryChannels.has(event.channel)
    );
    const statusEvents = notificationEvents.filter(
      (event) => event.event_type === "project_request.status_updated" && deliveryChannels.has(event.channel)
    );

    assert(createdEvents.length >= submissions.length, "lead report is missing created notification delivery events");
    assert(statusEvents.length >= 1, "lead report is missing lifecycle notification delivery event");
    [...createdEvents, ...statusEvents].forEach((event) => {
      assert(event.status === "delivered", `notification delivery event is not delivered: ${event.event_type}`);
      assert(Number(event.status_code || 0) >= 200 && Number(event.status_code || 0) < 300, "notification delivery event has non-2xx status");
    });
  }

  submissions.forEach((submission) => {
    const reportedLead = recent.find((lead) => lead.email === submission.email);
    assert(reportedLead?.response_sla, `lead report is missing response SLA for ${submission.email}`);
    assert(reportedLead?.response_due_hours, `lead report is missing response due hours for ${submission.email}`);
    assert(reportedLead?.response_due_at, `lead report is missing response due timestamp for ${submission.email}`);
    assert(
      reportedLead?.response_remaining_hours !== undefined && reportedLead?.response_remaining_hours !== null,
      `lead report is missing response remaining hours for ${submission.email}`
    );
    assert(reportedLead?.form_variant === submission.formVariant, `lead report is missing form variant for ${submission.email}`);
    assert(reportedLead?.locale === submission.locale, `lead report is missing locale for ${submission.email}`);
    assert(reportedLead?.utm_source === submission.source, `lead report is missing UTM source for ${submission.email}`);
    assert(reportedLead?.utm_medium === submission.medium, `lead report is missing UTM medium for ${submission.email}`);
    assert(reportedLead?.utm_campaign === submission.campaign, `lead report is missing UTM campaign for ${submission.email}`);
    assert(reportedLead?.business_problem === submission.problem, `lead report is missing business problem for ${submission.email}`);
    assert(reportedLead?.desired_result === submission.result, `lead report is missing desired result for ${submission.email}`);
    assert(reportedLead?.contact_details, `lead report is missing contact details for ${submission.email}`);
  });
}

function verifyExport(csv, submissions) {
  if (!csv) return;

  assert(csv.startsWith("id,created_at,status"), "lead export is missing expected CSV header");

  submissions.forEach((submission) => {
    assert(csv.includes(submission.email), `lead export is missing ${submission.email}`);
  });

  assert(csv.includes("lead_owner"), "lead export is missing lifecycle owner column");
  assert(csv.includes("needs_owner"), "lead export is missing needs_owner column");
  assert(csv.includes("needs_next_action"), "lead export is missing needs_next_action column");
  assert(csv.includes("locale"), "lead export is missing locale column");
  assert(csv.includes("form_variant"), "lead export is missing form variant column");
  assert(csv.includes("utm_source"), "lead export is missing UTM source column");
  assert(csv.includes("utm_medium"), "lead export is missing UTM medium column");
  assert(csv.includes("utm_campaign"), "lead export is missing UTM campaign column");
  assert(csv.includes("response_sla"), "lead export is missing response SLA column");
  assert(csv.includes("response_due_at"), "lead export is missing response due timestamp column");
  assert(csv.includes("response_remaining_hours"), "lead export is missing response remaining hours column");
  assert(csv.includes("follow_up_sla"), "lead export is missing follow-up SLA column");
  assert(csv.includes("follow_up_age_hours"), "lead export is missing follow-up age hours column");
  assert(csv.includes("qa_verified_follow_up"), "lead export is missing lifecycle next action");
  submissions.forEach((submission) => {
    assert(csv.includes(submission.formVariant), `lead export is missing form variant ${submission.formVariant}`);
  });
}

function verifyPartnerExport(csv, partnerSubmission) {
  if (!csv || !partnerSubmission) return;

  assert(csv.includes(partnerSubmission.email), "partner-filtered export is missing partner lead");
  assert(csv.includes(partnerSubmission.partner), "partner-filtered export is missing partner ref");
}

function recentDateFilter() {
  return new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function verifyFilteredReport(report, expectedSubmission, filterLabel, expectedFilters = {}) {
  if (!report || !expectedSubmission) return;

  const recent = Array.isArray(report.recent_leads) ? report.recent_leads : [];
  const emails = new Set(recent.map((lead) => lead.email));

  assert(emails.has(expectedSubmission.email), `${filterLabel} report is missing ${expectedSubmission.email}`);
  assert(report.filters, `${filterLabel} report is missing applied filters`);
  Object.entries(expectedFilters).forEach(([key, value]) => {
    assert(report.filters[key] === value, `${filterLabel} report did not echo filter ${key}=${value}`);
  });
}

async function main() {
  console.log(`Lead smoke base: ${baseUrl}`);
  console.log(`Lead smoke run: ${runId}`);
  if (turnstileToken) console.log("Lead smoke Turnstile token: provided");
  assert(!requireReport || reportToken, "LEAD_SMOKE_REQUIRE_REPORT=1 requires LEAD_REPORT_TOKEN or LEAD_SMOKE_REPORT_TOKEN");

  const submissions = [];

  for (const testCase of cases) {
    const submission = await submitLead(testCase);
    await verifyConversionProof(submission);
    submissions.push(submission);
    console.log(`${testCase.locale}: stored ${submission.email}; one-time conversion proof verified`);
  }

  const lifecycleUpdate = await updateLeadStatus(submissions[0]);
  const report = await fetchReport();
  verifyReport(report, submissions, lifecycleUpdate?.lead, lifecycleUpdate?.status_event);
  const partnerSubmission = submissions.find((submission) => submission.partner);
  const partnerReport = await fetchReport({ partner_ref: partnerSubmission?.partner });
  verifyFilteredReport(partnerReport, partnerSubmission, "partner-filtered", { partner_ref: partnerSubmission?.partner });
  const statusReport = await fetchReport({ status: "contacted" });
  verifyFilteredReport(statusReport, submissions[0], "status-filtered", { status: "contacted" });
  const slaReport = await fetchReport({ response_sla: "touched" });
  verifyFilteredReport(slaReport, submissions[0], "SLA-filtered", { response_sla: "touched" });
  const followUpReport = await fetchReport({ follow_up_sla: "on_track" });
  verifyFilteredReport(followUpReport, submissions[0], "follow-up-filtered", { follow_up_sla: "on_track" });
  const ownerReport = await fetchReport({ owner: "qa" });
  verifyFilteredReport(ownerReport, submissions[0], "owner-filtered", { owner: "qa" });
  const needsOwnerReport = await fetchReport({ needs_owner: "1" });
  verifyFilteredReport(needsOwnerReport, submissions[1], "needs-owner-filtered", { needs_owner: true });
  const createdFrom = recentDateFilter();
  const dateReport = await fetchReport({ created_from: createdFrom });
  verifyFilteredReport(dateReport, submissions[0], "date-filtered", { created_from: `${createdFrom}T00:00:00.000Z` });
  const formVariantReport = await fetchReport({ form_variant: submissions[1].formVariant });
  verifyFilteredReport(formVariantReport, submissions[1], "form-variant-filtered", { form_variant: submissions[1].formVariant });
  const localeReport = await fetchReport({ locale: submissions[1].locale });
  verifyFilteredReport(localeReport, submissions[1], "locale-filtered", { locale: submissions[1].locale });
  const utmSourceReport = await fetchReport({ utm_source: submissions[1].source });
  verifyFilteredReport(utmSourceReport, submissions[1], "UTM-source-filtered", { utm_source: submissions[1].source });
  const utmMediumReport = await fetchReport({ utm_medium: submissions[1].medium });
  verifyFilteredReport(utmMediumReport, submissions[1], "UTM-medium-filtered", { utm_medium: submissions[1].medium });
  const utmCampaignReport = await fetchReport({ utm_campaign: submissions[1].campaign });
  verifyFilteredReport(utmCampaignReport, submissions[1], "UTM-campaign-filtered", { utm_campaign: submissions[1].campaign });
  const csv = await fetchExport();
  verifyExport(csv, submissions);
  const partnerCsv = await fetchExport({ partner_ref: partnerSubmission?.partner });
  verifyPartnerExport(partnerCsv, partnerSubmission);
  const slaCsv = await fetchExport({ response_sla: "touched" });
  if (slaCsv) assert(slaCsv.includes(submissions[0].email), "SLA-filtered export is missing touched lifecycle lead");
  const followUpCsv = await fetchExport({ follow_up_sla: "on_track" });
  if (followUpCsv) assert(followUpCsv.includes(submissions[0].email), "follow-up filtered export is missing touched lifecycle lead");
  const needsOwnerCsv = await fetchExport({ needs_owner: "1" });
  if (needsOwnerCsv) assert(needsOwnerCsv.includes(submissions[1].email), "needs-owner export is missing unassigned active lead");
  const dateCsv = await fetchExport({ created_from: createdFrom });
  if (dateCsv) assert(dateCsv.includes(submissions[0].email), "date-filtered export is missing recent smoke lead");
  const localeCsv = await fetchExport({ locale: submissions[1].locale });
  if (localeCsv) assert(localeCsv.includes(submissions[1].email), "locale-filtered export is missing localized lead");
  const utmSourceCsv = await fetchExport({ utm_source: submissions[1].source });
  if (utmSourceCsv) assert(utmSourceCsv.includes(submissions[1].email), "UTM-source-filtered export is missing matching lead");
  const utmCampaignCsv = await fetchExport({ utm_campaign: submissions[1].campaign });
  if (utmCampaignCsv) assert(utmCampaignCsv.includes(submissions[1].email), "UTM-campaign-filtered export is missing matching lead");

  if (report) {
    console.log(
      `lead-report/export: verified ${submissions.length} smoke leads, lifecycle status events, notification delivery events, follow-up context, follow-up SLA filters, owner filters, date range filters, locale filters, form variants, UTM breakdowns and filters, source performance, conversion totals, response SLA filters, partner ref, and partner performance`
    );
  } else {
    console.log("lead-report/export: skipped because LEAD_REPORT_TOKEN is not set");
  }

  console.log("Lead smoke test passed.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

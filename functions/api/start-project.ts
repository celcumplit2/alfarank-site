type Env = {
  DB: D1Database;
};

type ProjectRequest = {
  name: string;
  email: string;
  company: string;
  project_type: string;
  current_system: string;
  business_problem: string;
  desired_result: string;
  desired_output: string;
  integrations: string;
  budget: string;
  timeline: string;
  contact_details: string;
  source_path: string;
  landing_page: string;
  landing_offer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  user_agent: string;
  ip_address: string;
};

const MAX_FIELD_LENGTH = 6000;

function clean(value: FormDataEntryValue | null): string {
  return String(value ?? "").trim().slice(0, MAX_FIELD_LENGTH);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function htmlResponse(message: string, status = 400): Response {
  return new Response(message, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8"
    }
  });
}

async function parseRequest(request: Request): Promise<ProjectRequest & { honeypot: string }> {
  const form = await request.formData();

  return {
    name: clean(form.get("name")),
    email: clean(form.get("email")),
    company: clean(form.get("company")),
    project_type: clean(form.get("project_type")),
    current_system: clean(form.get("current_system")),
    business_problem: clean(form.get("business_problem")),
    desired_result: clean(form.get("desired_result")),
    desired_output: clean(form.get("desired_output")),
    integrations: clean(form.get("integrations")),
    budget: clean(form.get("budget")),
    timeline: clean(form.get("timeline")),
    contact_details: clean(form.get("contact_details")),
    source_path: clean(form.get("source_path")),
    landing_page: clean(form.get("landing_page")),
    landing_offer: clean(form.get("landing_offer")),
    utm_source: clean(form.get("utm_source")),
    utm_medium: clean(form.get("utm_medium")),
    utm_campaign: clean(form.get("utm_campaign")),
    utm_term: clean(form.get("utm_term")),
    utm_content: clean(form.get("utm_content")),
    user_agent: request.headers.get("user-agent") ?? "",
    ip_address: request.headers.get("cf-connecting-ip") ?? "",
    honeypot: clean(form.get("company_website"))
  };
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return htmlResponse("Project request storage is not configured.", 500);
  }

  const payload = await parseRequest(request);

  if (payload.honeypot) {
    return Response.redirect(new URL("/start-project/thank-you/", request.url), 303);
  }

  if (!payload.name || !payload.email || !payload.business_problem || !payload.desired_result) {
    return htmlResponse("Name, email, business problem, and desired result are required.");
  }

  if (!isValidEmail(payload.email)) {
    return htmlResponse("A valid email address is required.");
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  try {
    await env.DB.prepare(
      `INSERT INTO project_requests (
        id,
        name,
        email,
        company,
        project_type,
        current_system,
        business_problem,
        desired_result,
        desired_output,
        integrations,
        budget,
        timeline,
        contact_details,
        source_path,
        landing_page,
        landing_offer,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        user_agent,
        ip_address,
        status,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`
    )
      .bind(
        id,
        payload.name,
        payload.email,
        payload.company,
        payload.project_type,
        payload.current_system,
        payload.business_problem,
        payload.desired_result,
        payload.desired_output,
        payload.integrations,
        payload.budget,
        payload.timeline,
        payload.contact_details,
        payload.source_path,
        payload.landing_page,
        payload.landing_offer,
        payload.utm_source,
        payload.utm_medium,
        payload.utm_campaign,
        payload.utm_term,
        payload.utm_content,
        payload.user_agent,
        payload.ip_address,
        createdAt
      )
      .run();
  } catch (error) {
    console.error("Failed to store project request", error);
    return htmlResponse("Project request could not be stored. Please try again or contact AlfaRank directly.", 500);
  }

  return Response.redirect(new URL("/start-project/thank-you/", request.url), 303);
};

export const onRequestGet: PagesFunction = async () => {
  return htmlResponse("Method not allowed.", 405);
};

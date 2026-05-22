type Env = {
  DB: D1Database;
};

type ProjectRequest = {
  name: string;
  email: string;
  project_type: string;
  current_system: string;
  business_problem: string;
  desired_result: string;
  budget: string;
  timeline: string;
  source_path: string;
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
    project_type: clean(form.get("project_type")),
    current_system: clean(form.get("current_system")),
    business_problem: clean(form.get("business_problem")),
    desired_result: clean(form.get("desired_result")),
    budget: clean(form.get("budget")),
    timeline: clean(form.get("timeline")),
    source_path: clean(form.get("source_path")),
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

  await env.DB.prepare(
    `INSERT INTO project_requests (
      id,
      name,
      email,
      project_type,
      current_system,
      business_problem,
      desired_result,
      budget,
      timeline,
      source_path,
      user_agent,
      ip_address,
      status,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`
  )
    .bind(
      id,
      payload.name,
      payload.email,
      payload.project_type,
      payload.current_system,
      payload.business_problem,
      payload.desired_result,
      payload.budget,
      payload.timeline,
      payload.source_path,
      payload.user_agent,
      payload.ip_address,
      createdAt
    )
    .run();

  return Response.redirect(new URL("/start-project/thank-you/", request.url), 303);
};

export const onRequestGet: PagesFunction = async () => {
  return htmlResponse("Method not allowed.", 405);
};

const args = process.argv.slice(2);

function argValue(name, fallback = "") {
  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1]) return args[index + 1];
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  return inline ? inline.slice(name.length + 1) : fallback;
}

const baseUrl = argValue("--base-url", "https://alfarank.com").replace(/\/$/, "");
const failures = [];
const passed = [];

function check(label, condition, detail = label) {
  if (condition) passed.push(label);
  else failures.push(detail);
}

async function fetchCritical(pathname, options = {}) {
  const { allowPartial = false, headers = {}, ...fetchOptions } = options;
  const response = await fetch(`${baseUrl}${pathname}`, {
    redirect: "manual",
    headers: {
      "cache-control": "no-cache",
      "user-agent": "AlfaRank-Production-QA/1.0",
      ...headers
    },
    ...fetchOptions
  });
  const acceptedStatus = response.status === 200 || (allowPartial && response.status === 206);
  check(`${pathname} returns a successful response`, acceptedStatus, `${pathname} returned HTTP ${response.status}.`);
  check(`${pathname} does not redirect`, response.status < 300, `${pathname} redirects to ${response.headers.get("location") || "unknown"}.`);
  return response;
}

for (const localePath of ["", "/ro", "/ru"]) {
  const pathname = `${localePath}/alfa-pulse/`;
  const response = await fetchCritical(pathname);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1] || "";
  check(`${pathname} is Alfa Pulse`, title.includes("ALFA Pulse"), `${pathname} fell back to the home page (title: ${title || "missing"}).`);
}

for (const locale of ["en", "ro", "ru"]) {
  const pathname = `/offers/alfa-pulse/alfa-pulse-offer-${locale}.pdf`;
  const response = await fetchCritical(pathname, { allowPartial: true, headers: { range: "bytes=0-4" } });
  const contentType = response.headers.get("content-type") || "";
  const bytes = new Uint8Array(await response.arrayBuffer());
  const signature = String.fromCharCode(...bytes.slice(0, 5));
  check(`${pathname} has PDF content type`, contentType.startsWith("application/pdf"), `${pathname} returned ${contentType || "no content type"}.`);
  check(`${pathname} has PDF signature`, signature === "%PDF-", `${pathname} does not start with a PDF signature.`);
}

for (const slug of ["automate-lead-processing", "ai-content-workflow", "ecommerce-feed-system", "wordpress-crm-integration"]) {
  const pathname = `/lp/${slug}/`;
  const response = await fetchCritical(pathname);
  const html = await response.text();
  check(`${pathname} is a landing offer`, html.includes(`landing_offer`) && !html.includes("Digital systems that connect, automate, and perform."), `${pathname} fell back to the home page.`);
}

{
  const pathname = "/sales/";
  const response = await fetchCritical(pathname);
  const html = await response.text();
  check("Sales Tracker uses the single client form", html.includes("data-quick-add-form data-client-form"), "Production Sales Tracker is missing the single client form.");
  check("Sales Tracker removed the old details panel", !html.includes("data-client-details-panel"), "Production Sales Tracker contains the obsolete details panel.");
  check("Sales Tracker keeps XLSX export", html.includes("data-export-xlsx"), "Production Sales Tracker is missing XLSX export.");
  check("Sales Tracker keeps custom dates", html.includes("sales-date-picker") && !html.includes('type="date"'), "Production Sales Tracker has lost the custom calendar contract.");
}

if (failures.length > 0) {
  console.error("Critical production QA failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`Critical production QA passed: ${passed.length} checks.`);
  console.log(`Base URL: ${baseUrl}`);
}

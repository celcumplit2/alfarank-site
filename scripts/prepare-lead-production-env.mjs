import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const defaultOutput = ".env.lead.production.local";
const templatePath = "config/lead-production.env.example";

function argValue(name, fallback = "") {
  const direct = args.find((arg) => arg.startsWith(`${name}=`));
  if (direct) return direct.slice(name.length + 1);

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1]) return args[index + 1];

  return fallback;
}

function hasFlag(name) {
  return args.includes(name);
}

function printHelp() {
  console.log(`Usage:
  npm run lead-env:prepare
  npm run lead-env:prepare -- --output .env.lead.production.local

Creates an ignored production lead env draft from ${templatePath}.
The generated file includes a strong LEAD_REPORT_TOKEN and placeholders for
real notification, quick contact, analytics, and optional Turnstile values.

Options:
  --output <path>   Defaults to ${defaultOutput}.
  --force           Overwrite an existing output file.
  --dry-run         Validate the template and show the target path without writing.
`);
}

function generatedToken() {
  return `alfa_lead_${randomBytes(32).toString("base64url")}`;
}

function fillTemplate(template) {
  return template.replace(/^LEAD_REPORT_TOKEN=.*$/m, `LEAD_REPORT_TOKEN=${generatedToken()}`);
}

function main() {
  if (hasFlag("--help") || hasFlag("-h")) {
    printHelp();
    return;
  }

  const output = argValue("--output", defaultOutput);
  const absoluteTemplatePath = path.resolve(root, templatePath);
  const absoluteOutputPath = path.resolve(root, output);

  if (!existsSync(absoluteTemplatePath)) {
    throw new Error(`${templatePath} is missing.`);
  }

  if (hasFlag("--dry-run")) {
    readFileSync(absoluteTemplatePath, "utf8");
    console.log(`Production lead env draft target: ${output}`);
    console.log("Template is readable. No file was written.");
    return;
  }

  if (existsSync(absoluteOutputPath) && !hasFlag("--force")) {
    throw new Error(`${output} already exists. Use --force to overwrite it.`);
  }

  const template = readFileSync(absoluteTemplatePath, "utf8");
  writeFileSync(absoluteOutputPath, fillTemplate(template));

  console.log(`Created ${output}`);
  console.log("Secret values were not printed.");
  console.log("Fill real notification, contact, analytics, and optional Turnstile values, then run:");
  console.log(`node scripts/audit-lead-production-env.mjs --env-file ${output}`);
}

main();

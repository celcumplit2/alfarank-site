import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const distDir = "dist";
const headingLimit = 60;
const headingPattern = /<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi;

const htmlEntities = new Map([
  ["amp", "&"],
  ["quot", "\""],
  ["apos", "'"],
  ["#39", "'"],
  ["nbsp", " "],
  ["lt", "<"],
  ["gt", ">"]
]);

const files = [];

async function collectHtmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      await collectHtmlFiles(path);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(path);
    }
  }
}

function decodeEntities(value) {
  return value.replace(/&([^;]+);/g, (match, entity) => {
    if (htmlEntities.has(entity)) {
      return htmlEntities.get(entity);
    }

    if (entity.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }

    if (entity.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }

    return match;
  });
}

function normalizeHeading(value) {
  return decodeEntities(value)
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

await collectHtmlFiles(distDir);

const violations = [];

for (const file of files) {
  const html = await readFile(file, "utf8");

  for (const match of html.matchAll(headingPattern)) {
    const text = normalizeHeading(match[2]);

    if (text.length > headingLimit) {
      violations.push({
        file: relative(process.cwd(), file),
        tag: `h${match[1]}`,
        length: text.length,
        text
      });
    }
  }
}

if (violations.length > 0) {
  console.error(`Heading copy limit failed: ${violations.length} heading(s) exceed ${headingLimit} characters.\n`);

  for (const violation of violations.slice(0, 40)) {
    console.error(`${violation.file} ${violation.tag} (${violation.length}): ${violation.text}`);
  }

  if (violations.length > 40) {
    console.error(`\n...and ${violations.length - 40} more.`);
  }

  process.exit(1);
}

console.log(`Heading copy limit passed: h1-h3 headings are <= ${headingLimit} characters.`);

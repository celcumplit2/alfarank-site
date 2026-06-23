import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const distDir = "dist";
const defaultHeadingLimit = 84;
const localizedHeadingLimit = 110;
const headingPattern = /<h([1-3])\b([^>]*)>([\s\S]*?)<\/h\1>/gi;
const articleCopyPattern = /<(h[1-6]|p|li|strong|span)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
const novaArticlePattern = /<article class="nova-article"[\s\S]*?<\/article>\s*<\/main>/i;
const truncatedHeadingPattern = /(?:\.{3}|\u2026)/;
const lowercaseSentenceStartPattern = /(^|(?:[.!?;][)"'»”’\]\}]*\s+|[—–-]\s+))["'«“„‘(\[{]*(\p{Ll})/u;
const trustPagePattern = /<article class="section nova-trust-page"[\s\S]*?<\/article>\s*<\/main>/i;
const repeatedColonPrefixLimit = 2;
const bannedHeadingPatterns = [
  {
    pattern: /playbook\s+для\s+операторов:/i,
    reason: "contains literal operator playbook phrasing"
  }
];

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

function shouldCheckSentenceStarts(text) {
  return !/^(?:https?:\/\/|[\w.+-]+@[\w.-]+|[\w.-]+\.[a-z]{2,})$/i.test(text);
}

function headingLimitForFile(file) {
  const path = relative(process.cwd(), file).replaceAll("\\", "/");
  return path.startsWith("dist/ro/") || path.startsWith("dist/ru/")
    ? localizedHeadingLimit
    : defaultHeadingLimit;
}

await collectHtmlFiles(distDir);

const violations = [];

for (const file of files) {
  const html = await readFile(file, "utf8");
  const headingLimit = headingLimitForFile(file);

  for (const match of html.matchAll(headingPattern)) {
    const text = normalizeHeading(match[3]);
    const ignoredCopyLimit = match[2].includes('data-heading-copy-limit="ignore"');

    if (truncatedHeadingPattern.test(text)) {
      violations.push({
        file: relative(process.cwd(), file),
        tag: `h${match[1]}`,
        length: text.length,
        reason: "contains ellipsis",
        text
      });
    }

    if (!ignoredCopyLimit && text.length > headingLimit) {
      violations.push({
        file: relative(process.cwd(), file),
        tag: `h${match[1]}`,
        length: text.length,
        reason: `exceeds ${headingLimit} characters`,
        text
      });
    }
  }

  const articleHtml = html.match(novaArticlePattern)?.[0] ?? html.match(trustPagePattern)?.[0];

  if (articleHtml) {
    const articleHeadings = [];

    for (const match of articleHtml.matchAll(headingPattern)) {
      const text = normalizeHeading(match[3]);
      articleHeadings.push({ tag: `h${match[1]}`, text });

      for (const bannedHeading of bannedHeadingPatterns) {
        if (bannedHeading.pattern.test(text)) {
          violations.push({
            file: relative(process.cwd(), file),
            tag: `h${match[1]}`,
            length: text.length,
            reason: bannedHeading.reason,
            text
          });
        }
      }
    }

    const colonPrefixes = new Map();

    for (const heading of articleHeadings) {
      const prefix = heading.text.match(/^([^:]{8,58}):\s+\S/)?.[1]?.toLowerCase();
      if (!prefix) continue;

      colonPrefixes.set(prefix, [...(colonPrefixes.get(prefix) ?? []), heading]);
    }

    for (const [prefix, headings] of colonPrefixes) {
      if (headings.length <= repeatedColonPrefixLimit) continue;

      violations.push({
        file: relative(process.cwd(), file),
        tag: headings.map((heading) => heading.tag).join(","),
        length: headings.length,
        reason: "repeated colon heading prefix",
        text: `${prefix}: (${headings.length} headings)`
      });
    }

    for (const match of articleHtml.matchAll(articleCopyPattern)) {
      const text = normalizeHeading(match[3]);

      if (shouldCheckSentenceStarts(text) && lowercaseSentenceStartPattern.test(text)) {
        violations.push({
          file: relative(process.cwd(), file),
          tag: match[1],
          length: text.length,
          reason: "lowercase sentence start",
          text
        });
      }
    }
  }
}

if (violations.length > 0) {
  console.error(`News copy check failed: ${violations.length} issue(s).\n`);

  for (const violation of violations.slice(0, 40)) {
    console.error(`${violation.file} ${violation.tag} (${violation.length}, ${violation.reason}): ${violation.text}`);
  }

  if (violations.length > 40) {
    console.error(`\n...and ${violations.length - 40} more.`);
  }

  process.exit(1);
}

console.log("News copy check passed: headings are concise, contain no ellipsis, and article sentences start uppercase.");

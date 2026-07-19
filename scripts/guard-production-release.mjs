import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import path from "node:path";

const expectedRoot = path.resolve(process.env.ALFA_PRODUCTION_REPO || "D:/ALFA_release_sales_sync");
const currentRoot = path.resolve(process.cwd());

function fail(message) {
  throw new Error(`Production release blocked: ${message}`);
}

function git(args) {
  return execFileSync("git", args, { cwd: currentRoot, encoding: "utf8" }).trim();
}

if (currentRoot.toLowerCase() !== expectedRoot.toLowerCase()) {
  fail(`run from ${expectedRoot}, not ${currentRoot}. D:/ALFA is not a production workspace.`);
}

const remote = git(["remote", "get-url", "origin"]);
if (!/^https:\/\/github\.com\/celcumplit2\/alfarank-site(?:\.git)?$/i.test(remote)) {
  fail(`unexpected origin remote: ${remote}`);
}

const fetchResult = spawnSync("git", ["fetch", "origin", "main"], {
  cwd: currentRoot,
  encoding: "utf8",
  stdio: "pipe"
});
if (fetchResult.status !== 0) {
  fail(`cannot refresh origin/main: ${(fetchResult.stderr || fetchResult.stdout || "unknown error").trim()}`);
}

const trackedChanges = git(["status", "--porcelain", "--untracked-files=no"]);
if (trackedChanges) {
  fail("tracked files are dirty. Commit the intended release before production.");
}

const head = git(["rev-parse", "HEAD"]);
const originMain = git(["rev-parse", "origin/main"]);
const ancestry = spawnSync("git", ["merge-base", "--is-ancestor", "origin/main", "HEAD"], {
  cwd: currentRoot,
  stdio: "ignore"
});
if (ancestry.status !== 0) {
  fail(`HEAD ${head.slice(0, 7)} does not contain origin/main ${originMain.slice(0, 7)}.`);
}

const requiredFiles = [
  "src/pages/alfa-pulse.astro",
  "src/pages/sales.astro",
  "public/offers/alfa-pulse/alfa-pulse-offer-en.pdf",
  "public/offers/alfa-pulse/alfa-pulse-offer-ro.pdf",
  "public/offers/alfa-pulse/alfa-pulse-offer-ru.pdf",
  "public/offers/alfa-pulse/alfa-pulse-cover-en.png",
  "public/offers/alfa-pulse/alfa-pulse-cover-ro.png",
  "public/offers/alfa-pulse/alfa-pulse-cover-ru.png",
  "scripts/qa-sales-page.mjs",
  "scripts/qa-critical-production.mjs"
];

for (const relativePath of requiredFiles) {
  const absolutePath = path.join(currentRoot, relativePath);
  if (!existsSync(absolutePath)) fail(`required file is missing: ${relativePath}`);

  const tracked = spawnSync("git", ["ls-files", "--error-unmatch", "--", relativePath], {
    cwd: currentRoot,
    stdio: "ignore"
  });
  if (tracked.status !== 0) fail(`required file is not tracked by Git: ${relativePath}`);
}

for (const locale of ["en", "ro", "ru"]) {
  const pdfPath = path.join(currentRoot, `public/offers/alfa-pulse/alfa-pulse-offer-${locale}.pdf`);
  if (statSync(pdfPath).size < 100_000) fail(`Alfa Pulse ${locale} PDF is unexpectedly small.`);
}

console.log("Production release preflight passed.");
console.log(`Repository: ${currentRoot}`);
console.log(`HEAD: ${head}`);
console.log(`origin/main: ${originMain}`);
console.log("Direct Cloudflare Pages uploads remain forbidden; publish by pushing this commit to GitHub main.");

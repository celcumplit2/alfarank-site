console.error("Direct Cloudflare Pages deployment is disabled for AlfaRank production.");
console.error("Run `npm run release:preflight`, commit the release, and push it to GitHub main.");
console.error("Cloudflare must build production from the GitHub push; never upload a local dist directory.");
process.exitCode = 1;

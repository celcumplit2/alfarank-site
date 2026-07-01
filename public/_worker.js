const canonicalHost = "alfarank.com";
const redirectHosts = new Set(["alfarank-site.pages.dev", "www.alfarank.com"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    if (redirectHosts.has(host) || host.endsWith(".alfarank-site.pages.dev")) {
      url.protocol = "https:";
      url.hostname = canonicalHost;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};

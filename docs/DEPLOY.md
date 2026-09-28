# Deploying to Vercel

The site is static HTML with no runtime. `vercel.json` at the repo root carries
the configuration, carried over from removalstochina.com.

## 1. Import the project

Vercel dashboard → **Add New → Project → Import** `woodleydigital/removalstonz`.
Leave the framework preset alone; Vercel reads `vercel.json`:

| Setting | Value |
|---|---|
| Framework | None |
| Build command | `npm run check` (build, then the quality gate) |
| Output directory | `dist` |
| Node | 22.x (from `package.json` `engines`) |

Because the build command is `npm run check`, **a critical audit failure fails
the deploy** — a broken link, a duplicate page or a broken hreflang cluster
cannot reach production.

## 2. Domains — the one thing that must be right

Every canonical, hreflang URL, sitemap entry and JSON-LD `@id` is built from
`SITE_URL` in `src/data/site.js`, currently **`https://removalstonz.com`** (apex).

In **Project → Settings → Domains**:

1. Add `removalstonz.com` and make it **primary**.
2. Add `www.removalstonz.com` and set it to **redirect** to the apex.

If you would rather serve `www`, change `SITE_URL` first and rebuild. A mismatch
makes every page canonicalise — and every hreflang point — to a URL that
redirects, which Google treats as an error. It fails silently.

Before moving nameservers, inventory the existing DNS records (especially `MX`
and `TXT`) so email on the domain is not lost — the same process documented in
removalstochina.com's `docs/DEPLOY.md`. The `enquiries@removalstonz.com`
mailbox (register item V-02) depends on this.

## 3. What `vercel.json` sets

- `trailingSlash: true`, so `/uk` 308s to `/uk/` and every URL has one form.
- `*.vercel.app` hosts get `X-Robots-Tag: noindex, nofollow`, so preview and
  default deployments never compete with the real domain.
- Immutable one-year caching for the content-hashed `/css/`, `/js/` and `/img/`.
- Security headers: HSTS, `nosniff`, `SAMEORIGIN`, a strict referrer policy and
  a permissions policy.

There is **no geo-redirect** and there must never be one — see
[`INTERNATIONAL-SEO.md`](./INTERNATIONAL-SEO.md), section 1.

## 4. After the first deploy

1. Search Console: add a Domain property for `removalstonz.com`, plus URL-prefix
   properties for `/uk/`, `/us/`, `/au/`, `/ca/` and `/europe/`.
2. Submit `https://removalstonz.com/sitemap.xml`. It carries the hreflang
   alternates for every clustered page.
3. **Do not set a country target.**
4. Check the hreflang report after a couple of weeks: zero "no return tags".

## Other hosts

Nothing is Vercel-specific except `vercel.json`. For Netlify or Cloudflare
Pages, build with `EMIT_HEADERS_FILE=1 npm run check` to write the same caching
and security headers to `dist/_headers`.

# Enquiry form: IMC's own, embedded

The enquiry form on this site is **International Moving Company's form**,
embedded in an iframe from internationalmoving.company. There is one form, one
validation and one delivery route across IMC's sites; nothing to rebuild here.

## How it fits together

```
removalstonz.com page
  └─ <iframe src="https://internationalmoving.company/embed/enquiry/
                  ?source=removalstonz&market=uk&page=/uk/&to=New Zealand">
        IMC QuoteForm (Address → Details → Contact)
          └─ POST /api/quote/  →  IMC's email delivery
```

| Part | Where it lives |
|---|---|
| The frame, its reserved height, the fallback link | `src/lib/components.js` → `leadForm()` |
| Embed origin and parameters | `src/data/site.js` → `ENQUIRY` |
| Resizing and the submit event | `src/assets/js/app.js`, section 1 |
| The form, validation, delivery | IMC repo: `app/quote-form.tsx`, `app/api/quote/route.ts` |
| The bare embed page | IMC repo: `app/embed/enquiry/` |
| Which sites may frame it | IMC repo: `next.config.ts` (`frame-ancestors`) |
| Known sources and their labels | IMC repo: `lib/enquiry.ts` → `ENQUIRY_SOURCES` |

## What each enquiry carries

The URL parameters become part of the enquiry IMC receives:

| Parameter | Example | In the email |
|---|---|---|
| `source` | `removalstonz` | Subject prefixed `[Removals to NZ]`; `Source: Removals to NZ (https://removalstonz.com)` |
| `market` | `uk` · `us` · `au` · `ca` · `europe` (absent on shared pages) | `Market: UK` |
| `page` | `/uk/cost-of-moving-to-new-zealand-from-uk/` | `Page: …` |
| `to` | `New Zealand` | Prefills "Moving to"; the customer can change it |

IMC accepts only sources registered in `ENQUIRY_SOURCES`; anything else is
dropped from the page and rejected by the API.

## Behaviour

- **No layout shift.** The frame reserves 580px, the form's first-step
  height at phone widths. IMC's page reports its real height by `postMessage`
  on every step, and `app.js` resizes the frame, so it never scrolls
  internally.
- **Only IMC is trusted.** `app.js` acts on a message only if it comes from the
  configured IMC origin *and* from one of this page's own frames. Messages
  carry no personal data.
- **The hero frame loads eagerly**; frames lower on a page load lazily.
- **Fallback.** Under every frame is a plain link to IMC's own quote page, so
  a blocked or failed embed never strands someone who wants to enquire.
- **Confirmation** is shown inside the frame by IMC's form. There is no
  thank-you page on this site.
- **Analytics.** On a successful submission `app.js` pushes
  `{ event: 'quote_submit', page, market }` to `window.dataLayer` and
  dispatches `rtnz:quote_submit` on `document`. Header, sticky and calculator
  buttons carry `data-cta`.

## Staging and previews

The embed only renders on origins IMC's `frame-ancestors` allows:
`removalstonz.com`, any `*.removalstonz.com` subdomain, and anything listed in
IMC's `EMBED_FRAME_ANCESTORS` environment variable.

- **Staging on a subdomain** (for example `staging.removalstonz.com`) works
  with no IMC change.
- **Staging on a `*.vercel.app` URL** needs that exact origin added to
  `EMBED_FRAME_ANCESTORS` in IMC's Vercel project, then an IMC redeploy (it is
  read at build time).
- **Testing against an IMC preview deployment** before the IMC change is in
  production: build this site with `ENQUIRY_ORIGIN=https://<imc-preview-url>`.
  Vercel Deployment Protection on the IMC preview will block the frame unless
  it is disabled for that deployment.

## Before launch

1. Merge IMC branch `claude/embeddable-enquiry-form` and deploy IMC to
   production — until then `/embed/enquiry/` does not exist on
   internationalmoving.company and the frame shows IMC's 404.
2. Confirm IMC's email delivery is configured in production (its
   `/api/quote/` returns a "not being delivered yet" message otherwise).
3. If IMC's Google Places key is referrer-restricted, nothing changes — the
   frame runs on IMC's own origin.

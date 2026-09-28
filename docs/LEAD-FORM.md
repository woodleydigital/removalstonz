# Lead form: field contract and integration

The quote form is the site's only conversion mechanism. It appears in every
market home's hero, at the foot of service, guide and destination pages, and on
the six quote pages (`/get-a-quote/` and one per market).

**Nothing is captured until step 1 is done.** The form posts to `/thank-you/`,
a placeholder that stores nothing (register item V-03).

---

## 1. Connecting an endpoint

```js
// src/data/nav.js
export const LEAD_FORM = {
  action: 'https://your-endpoint.example/quote',   // ← change this
  ...
};
```

Then `npm run build`. It is a plain `POST` with
`application/x-www-form-urlencoded`, so any form handler, serverless function
or CRM webhook will take it. After handling, redirect to
`https://removalstonz.com/thank-you/` (noindexed) — a pageview there is a
completed lead.

---

## 2. Field contract

### Hidden

| Field | Example | Purpose |
|---|---|---|
| `_form` | `nz-quote` | Identifies the form |
| `_market` | `uk` · `us` · `au` · `ca` · `europe` · `global` | **Route the lead** to the right team or partner |
| `_source` | `/uk/services/part-load-removals-to-new-zealand/` or `us-home-hero` | The page the lead came from |
| `estimated_volume_cbm` | `18.5` | Filled when the user used the calculator on the same page |
| `company_website` | *(empty)* | Honeypot — discard any submission where it is filled |

### Step 1 — scope

| Field | Values |
|---|---|
| `move_scope` | `household` · `part-load` · `baggage` · `vehicle` |

### Step 2 — route

| Field | Type |
|---|---|
| `origin_country` | Only on the global form (`_market=global`): `uk` · `us` · `au` · `ca` · `europe` · `other`. Required |
| `origin` | Free text — postcode, ZIP, postal code or town. Label is localised per market. Required |
| `destination` | Free text — town in New Zealand. Required |

### Step 3 — size

| Field | Values |
|---|---|
| `move_size` | `boxes` (≤2 m³ / 70 cu ft) · `studio` (5–10 m³) · `two-bed` (12–20 m³) · `three-bed-plus` (25 m³+) · `unsure` |

US forms show the same bands in cubic feet; the posted values are identical.

### Step 4 — timing

| Field | Values |
|---|---|
| `move_when` | `asap` · `1-month` · `1-3-months` · `researching` |

### Step 5 — contact

| Field | Type |
|---|---|
| `name` | Required |
| `email` | Required, validated |
| `phone` | Optional |
| `notes` | Optional free text |
| `consent` | `yes` when ticked. Required |

---

## 3. Behaviour

- Five short steps, one decision each; contact details last.
- Selecting an option on single-question steps advances automatically.
- With JavaScript disabled all five steps render at once and the form still
  posts under native browser validation.
- Analytics: vendor-neutral events are pushed to `window.dataLayer` and
  dispatched as DOM events prefixed `rtnz:` — `quote_step_view`, `quote_start`,
  `quote_invalid`, `quote_submit`, plus `volume_change` from the calculator.
- Buttons and links carry `data-cta` (`header`, `sticky-quote`,
  `sticky-email`, `calculator`, `market-banner`) for click tracking.

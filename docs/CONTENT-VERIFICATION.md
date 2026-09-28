# Content verification register

**Read this before launch.** Every volatile or high-stakes claim needs an owner,
a source and a review interval, and nothing may publish with an unsupported
claim. This register lists what needs a human to confirm it, and the standing
editorial rules that keep the site honest.

---

## A. Must be resolved before launch

| ID | Item | Where | What is needed |
|----|------|-------|----------------|
| **V-01** | **Operating company** | `src/data/site.js` → `OPERATOR`, `OFFICES`, `AFFILIATIONS` | The operator was left as a placeholder by instruction. Until `OPERATOR.confirmed` is `true`, the site names only the Removals to NZ brand: no MovingCompany node in JSON-LD, no founding year, office, accreditation or network claim anywhere. Supply the legal name, website, registration number, registered address, offices and memberships, set `confirmed: true`, and the build starts declaring the parent/subsidiary relationship both ways (as removalstochina.com does). The About and Legal pages switch over automatically. |
| **V-02** | **Enquiry email** | `src/data/site.js` → `CONTACT.email` | Set to `enquiries@removalstonz.com`. **The mailbox must exist and be monitored before launch**, or every "Email us" link goes nowhere. Change it here if a different address is used. |
| **V-03** | **Lead form endpoint** | `src/data/nav.js` → `LEAD_FORM.action` | Posts to `/thank-you/`, a placeholder that stores nothing. Point it at the CRM or form handler — see [`LEAD-FORM.md`](./LEAD-FORM.md). **The site cannot capture a lead until this is done.** |
| **V-04** | **Phone numbers per market** | `CONTACT.phones` | All `null`, so header, footer and schema are email-only. Add real local numbers per market (a UK number on `/uk/`, a US number on `/us/`…) if they exist. Do not invent them. |
| **V-05** | **Data-protection position** | `/legal/` | The page names the laws a reader may have rights under (UK GDPR, EU GDPR, Australian Privacy Act, PIPEDA, NZ Privacy Act 2020, US state laws) and promises the controller's details before launch. Which obligations actually attach — lawful basis, retention, international transfers to NZ and to origin partners — is for the operator's advisers once V-01 is known. |
| **V-06** | **Transit planning ranges** | `src/data/journey.js`, market pages | Door-to-door ranges (UK and Europe 10–16 weeks, US 8–14, Canada 8–15, Australia 4–8) and ocean legs are industry planning figures, not the operator's measured data. Confirm against the operator's current sailings. If one changes, update `journey.js` and grep the pages for the old range. |
| **V-07** | **Calculator inventory** | `src/data/calculator.js` | Reused from removalstochina.com (the client's own survey inventory, originally in AU/NZ trade terms). Confirm the NZ operator is content to publish it, or supply their own. |
| **V-08** | **Open Graph image** | `layout.js` → `ogImage` | `/img/og-default.png` does not exist yet. Add a 1200×630 image to `src/assets/img/` and social shares pick it up; until then no `og:image` is emitted. An `apple-touch-icon.png` (180×180) is likewise optional and picked up if added. |
| **V-09** | **Logo text outlining** | `src/assets/img/*.svg` | The wordmark uses a live font stack, so it renders slightly differently across machines. A designer should outline the text for production. |
| **V-10** | **Customs and biosecurity statements** | `/guides/new-zealand-customs-personal-effects/`, `/guides/new-zealand-biosecurity-what-you-cannot-bring/` | Written to the framework published by NZ Customs and MPI, without thresholds. Two statements should be confirmed against current guidance at launch: that Customs generally expects the owner to have arrived before unaccompanied goods clear, and the scope and season of MPI's brown marmorated stink bug measures (referred to on the US and Europe pages). |
| **V-11** | **Left-hand-drive vehicles** | US, Canada and Europe pages | The pages say LHD vehicles "face restrictions" and tell readers to check with NZTA Waka Kotahi, without stating the rules. Keep it that way unless the operator wants to publish specifics with a source. |

---

## B. Standing editorial rules

Enforced by `scripts/audit.mjs` unless stated otherwise. Do not relax them
without a deliberate decision.

### B1. No published rates — enforced

The site publishes cost **structure** and planning ranges, never prices. The
audit fails the build on any currency figure (`£`, `$`, `€` followed by a digit)
in body copy. That also catches `NZ$`, `A$`, `C$` and `US$`.

### B2. No customs or biosecurity specifics stated as fact — by policy

The customs and biosecurity guides describe the framework and name the
authority — the **New Zealand Customs Service** and the **Ministry for Primary
Industries**. They do not state allowances, value thresholds, qualifying
periods, fees or treatment prices. The audit fails either page if it stops
naming its authority or loses its visible review date. Both are reviewed every
six months.

### B3. No fabricated trust signals — enforced

No testimonials, ratings, review counts or customer logos, and no
`aggregateRating`, `reviewCount`, `ratingValue` or `priceCurrency` in JSON-LD.
No claims about years in business, offices or accreditations until V-01.

### B4. Destination pages describe routing, not local offices

Each NZ city page is about the arrival port, the inland leg and access at the
door. None claims a local office or crew. When the operator is confirmed, add
genuine local detail where it exists — never a swapped city name.

### B5. The journey chart is validated, not eyeballed

`journey.js` uses the categorical palette validated for removalstochina.com
(`#3C7628, #0B72AE, #A55F0C, #8A47A8`), deliberately not recoloured to the brand
teal, which would sit too close to the sea-transit blue. Every segment is
direct-labelled. Re-validate before changing any colour.

### B6. Market pages must stay distinct

The audit fails near-duplicates (over 50% 8-word shingle overlap) and warns
above 30%. When editing a market page, do not paste paragraphs from another
market; write what is true of that route. See
[`INTERNATIONAL-SEO.md`](./INTERNATIONAL-SEO.md).

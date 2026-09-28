# Brand

Removals to NZ is a division of **International Moving Company (IMC)** and uses
the IMC identity: its colours, its two typefaces, its component styling and
its voice, as recorded at <https://internationalmoving.company/brand/>. This
file covers what is specific to the division, and how it maps onto IMC.

---

## The mark: NZ, with the IMC door

The IMC mark is heavy geometric capitals in ink, with one device: inside the
M, the lower counter is a doorway, and a teal door stands open in it. An open
door is what a move is.

The division mark uses the same construction for **NZ**, measured from the
IMC artwork (cap height 220 units):

| | IMC | NZ |
|---|---|---|
| Letterforms | Heavy geometric capitals | The same — stems 66 units, 0.30 of cap height |
| Where the door is | Beneath the M's chevron | Beneath the N's diagonal, which stops on the right stem |
| Door leaf | Teal, 17 units off the hinge jamb, 40 wide, in perspective | The same |
| Colours | Ink #142D3B, accent #167D8D | The same |

So the two read as one family at a glance, and the NZ mark still says
"moving" on its own. At favicon size the N alone is used; its door is the
recognisable part.

### How it is used

- **Always beside the name, in live HTML text** — as IMC's header does:
  mark, a hairline divider, then **Removals to NZ** over *by International
  Moving Company*. Below 480px the endorsement line drops in the header only;
  the footer always carries it.
- **On light surfaces**: `rtnz-mark.svg` (ink and teal).
- **On ink**: `rtnz-mark-reversed.svg` (paper and light accent). Unlike the
  parent, which has only a raster with an ivory field and must be backed on a
  paper panel, this is a true vector on a transparent ground, so a reversed
  variant exists.
- Do not add a trade mark symbol, and do not recolour it outside these two
  variants.

### What the division mark does not claim

It is new artwork in the parent's construction, not a redraw of the IMC mark.
Like the IMC mark, it has had no legal clearance, recognition research or
print proofing. Get IMC's sign-off before it is used beyond this site.

---

## Colour — the IMC roles

| Role | Hex | Use | Contrast |
|---|---|---|---|
| Ink | `#142D3B` | Text, major surfaces (hero, header bar), the mark | 14.30:1 on white |
| Accent | `#167D8D` | Primary actions, rules, the door | 4.83:1 carrying white |
| Action hover | `#116A78` | Hover and active; links | 6.26:1 carrying white |
| Paper | `#F6F3ED` | Quiet surfaces: answer blocks, notes, footer | surface only |
| Muted text | `#526572` | Supporting text | 6.06:1 on white |
| Light accent | `#A7D2CE` | Display text and eyebrows on navy | 8.69:1 on ink |

The CSS keeps short component aliases (`--brand`, `--accent`, …) pointing at
these roles; change a colour in the `:root` block of `main.css` only.

The journey chart uses four of these roles in the order ink, accent, light
accent, muted, so every adjacent pair differs strongly in lightness. Every
segment is also labelled in text, following IMC's rule that colour never
carries a meaning on its own.

## Typography — the IMC pair, no webfonts

- **Georgia**, regular weight, tight tracking: page titles, section headings,
  the hero display line. The hero's closing phrase takes the light accent, as
  IMC's "International moving. *Clearly managed.*" does (`h1Accent` in page
  data).
- **Arial**: body (17px / 1.7), card headings (semibold), labels, forms,
  buttons. Figures use tabular numerals.
- **Eyebrows**: Arial bold, uppercase, tracked, in the accent; the hero's
  carries IMC's open-corner rule.

## Components

The same patterns as internationalmoving.company: a flat ink hero; a white
enquiry panel with a 4px teal top rule and the "Your moving plan" eyebrow;
teal buttons with 6px corners; 3px-radius inputs; open card columns under
hairlines, not boxed tiles; paper notes with a 3px rule; ruled FAQ rows; and
a paper footer.

## Voice

IMC's voice applies: calm, direct British and New Zealand English; say what
is collected, transported and delivered; say which milestone an estimate
describes; never promise a price, a response time or an outcome. The main
action is **Plan your move**. See IMC's brand page for the full do/don't list.

---

## Files

| File | Use |
|---|---|
| `src/assets/img/rtnz-mark.svg` | Mark on light surfaces; JSON-LD logo |
| `src/assets/img/rtnz-mark-reversed.svg` | Mark on ink |
| `src/assets/img/favicon.svg` | Browser tab: the N with its door, on paper |
| `src/assets/img/apple-touch-icon.png` | 180×180 home-screen icon |
| `src/assets/img/og-default.png` | 1200×630 sharing image in the IMC hero style |

## Regenerating

```bash
python3 scripts/brand/logo.py              # SVG mark, reversed mark, favicon
node scripts/brand/raster.mjs <fonts-dir>  # PNGs; needs Playwright's Chromium
```

`raster.mjs` renders with Gelasio and Arimo, the open metric-compatible
equivalents of Georgia and Arial, because a build machine may have neither
font. The geometry constants are at the top of `logo.py`.

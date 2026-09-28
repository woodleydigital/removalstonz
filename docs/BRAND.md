# Brand

## The mark: a kiwi under the Southern Cross

- **The kiwi** is New Zealand's most recognised symbol and the nickname New
  Zealanders give themselves. It is drawn facing right, towards New Zealand on
  a west-to-east read, foraging with its long beak down: at home, settled.
- **The Southern Cross** sits above it in poplar gold, arranged as on the New
  Zealand flag (four stars: Gamma top, Alpha bottom, Beta left, Delta right).
  The kiwi is nocturnal, and navigators found their way south by these stars.
- **The swell** under its feet is the voyage — the sea your belongings cross —
  rising towards the kiwi.

### What we deliberately did not use

- **The silver fern.** Heavily associated with national teams and government
  marks (the FernMark is a licensed New Zealand government brand). Too easy to
  collide with a protected or registered mark.
- **The koru and other Māori motifs.** They carry cultural meaning, and using
  them commercially without iwi involvement is widely considered
  inappropriate. If the operator wants to include te reo Māori or Māori design,
  do it properly, with a Māori designer.
- **The New Zealand flag itself.**

## Wordmark

**removals / to NZ**, set in **Outfit** ExtraBold (SIL Open Font License 1.1),
converted to outlines so the logo renders identically everywhere. "to NZ"
takes the Bay of Islands blue. The tagline **DOOR TO DOOR TO NEW ZEALAND**
(Outfit SemiBold, tracked) appears on large uses only; the header lockup drops
it, since it would render at about 5px there.

Outfit Bold is also the site's heading face (self-hosted, one 14 kB file,
preloaded, `font-display: optional` so it can never shift the layout). Body
copy stays on the system font stack.

## Palette — sampled from New Zealand landscapes

| Token | Hex | Name | Use | Contrast |
|---|---|---|---|---|
| `--ink` | `#0C2233` | Wakatipu night | Text, dark surfaces, logo | 16.3:1 on white |
| `--brand-darker` | `#07566A` | Bay of Islands, deep | Buttons, links | 8.2:1 on white |
| `--brand-deep` | `#0A6C80` | Bay of Islands | Text accents, "to NZ" | 6.1:1 on white |
| `--brand` | `#12A3B5` | Bay of Islands shallows | Borders, bars, the swell — never text | 3.0:1 on white |
| `--accent` | `#7FDCE6` | Shallows, light | Links and accents on dark | 10.3:1 on ink |
| `--accent-2` | `#F2B233` | Wānaka poplar gold | Stars, checkmarks on dark | 8.7:1 on ink |
| `--dusk` | `#3A3470` | Wānaka at dusk | Hero gradient, app icon | — |
| `--paper-2` | `#F4F7FA` | Alpine mist | Tinted sections | — |

The hero is the Wānaka dusk sky: night blue into dusk violet, with a faint
Southern Cross.

The journey chart keeps its own validated categorical palette (see
CONTENT-VERIFICATION B5); it is not recoloured to the brand.

## Files

| File | Use |
|---|---|
| `src/assets/img/removals-to-nz-lockup.svg` | Header (no tagline) |
| `src/assets/img/removals-to-nz-logo.svg` | Full lockup on light, with tagline; JSON-LD logo |
| `src/assets/img/removals-to-nz-logo-reversed.svg` | Full lockup on dark (footer, OG image) |
| `src/assets/img/removals-to-nz-mark.svg` | The mark alone |
| `src/assets/img/favicon.svg` | Favicon / app tile |
| `src/assets/img/apple-touch-icon.png` | 180×180 home-screen icon |
| `src/assets/img/og-default.png` | 1200×630 social sharing image |

## Regenerating

The SVGs are generated, not hand-edited:

```bash
pip install fonttools
# Outfit .woff files (500–800) from @fontsource/outfit in a folder:
python3 scripts/brand/logo.py path/to/outfit-woffs
node scripts/brand/raster.mjs     # PNGs; needs Playwright's Chromium
```

Colours and artwork are constants at the top of `scripts/brand/logo.py`.

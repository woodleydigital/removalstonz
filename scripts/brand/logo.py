#!/usr/bin/env python3
"""
Generate the Removals to NZ logo set as self-contained SVG.

The wordmark is set in Outfit (SIL Open Font License 1.1) and converted to
outlines here, so the logo renders identically everywhere and needs no font.
Re-run after changing a colour or the artwork:

    pip install fonttools
    python3 scripts/brand/logo.py <dir-with-outfit-woff-files>

Outputs to src/assets/img/.
"""

import sys
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'src' / 'assets' / 'img'
FONTS = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('.')

# Palette — see docs/BRAND.md. Sampled from New Zealand landscapes.
NIGHT = '#0C2233'     # Wakatipu at night — ink
SEA = '#0A6C80'       # Bay of Islands, deep — AA text and buttons
TEAL = '#12A3B5'      # Bay of Islands, shallows
TEAL_LIGHT = '#7FDCE6'
GOLD = '#F2B233'      # Wānaka poplars in autumn
MIST = '#EEF3F8'      # Alpine mist
DUSK = '#3A3470'      # Wānaka at dusk
MUTED = '#5B6B78'
MUTED_REV = '#AFC0CC'


def text_path(font_file, text, size, x, y, tracking=0.0):
    """Outline `text` at baseline (x, y) and return (svg path d, advance width)."""
    font = TTFont(font_file)
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    upm = font['head'].unitsPerEm
    scale = size / upm
    hmtx = font['hmtx']
    pen = SVGPathPen(glyph_set)
    cursor = 0.0
    for ch in text:
        name = cmap.get(ord(ch))
        if name is None:
            continue
        # y is flipped: font units point up, SVG points down.
        tp = TransformPen(pen, (scale, 0, 0, -scale, x + cursor, y))
        glyph_set[name].draw(tp)
        cursor += hmtx[name][0] * scale + tracking
    return pen.getCommands(), cursor - tracking


def star(cx, cy, r, points=5, inner=0.42):
    """A regular star, point up — the Southern Cross on the NZ flag uses five-pointed stars."""
    import math
    pts = []
    for i in range(points * 2):
        rad = r if i % 2 == 0 else r * inner
        a = -math.pi / 2 + i * math.pi / points
        pts.append(f'{cx + rad * math.cos(a):.2f},{cy + rad * math.sin(a):.2f}')
    return 'M' + 'L'.join(pts) + 'Z'


def southern_cross(ox, oy, s=1.0):
    """Crux as it sits on the New Zealand flag: gamma top, alpha bottom, beta left, delta right."""
    return ' '.join([
        star(ox + 0 * s, oy + 0 * s, 4.6 * s),     # Gamma Crucis — top
        star(ox + 1.5 * s, oy + 25 * s, 5.2 * s),  # Alpha Crucis — bottom, brightest
        star(ox - 10 * s, oy + 12 * s, 4.4 * s),   # Beta Crucis — left
        star(ox + 10.5 * s, oy + 9 * s, 3.8 * s),  # Delta Crucis — right
    ])


# The kiwi. Drawn facing right — towards New Zealand on a west-to-east read —
# at rest, long beak angled down to the ground as a kiwi forages. One compound
# path so it fills as a single silhouette; the eye is a knock-out.
KIWI_BODY = (
    'M18 70 C15 49 33 33 57 32 C71 31.5 80 34 87 37.5 '
    'C95 41.5 99 47 98 52.5 C97 57.5 92.5 60.5 87.5 61.5 '
    'C85.5 76 74.5 88.5 57 90 C37 91.5 20.5 84 18 70 Z'
)
KIWI_BEAK = 'M95.5 48.5 C107 55 115 66 121 83 C121.6 84.8 119.4 85.8 118.5 84 C111.5 69 103.5 59.5 92.5 54.5 Z'
KIWI_EYE = (89.5, 46.2, 2.1)
KIWI_LEGS = [
    # thigh-to-foot, then three toes
    'M50 88.5 L47 104', 'M47 104 L40.5 106.5', 'M47 104 L47.5 108.5', 'M47 104 L53.5 106.5',
    'M64 88.5 L65 104', 'M65 104 L58.5 106.5', 'M65 104 L66 108.5', 'M65 104 L71.5 106.5',
]


def kiwi(fill, eye_fill, dx=0, dy=0, s=1.0):
    t = f'translate({dx} {dy}) scale({s})'
    legs = ''.join(f'<path d="{d}"/>' for d in KIWI_LEGS)
    ex, ey, er = KIWI_EYE
    return (
        f'<g transform="{t}">'
        f'<path d="{KIWI_BODY} {KIWI_BEAK}" fill="{fill}"/>'
        f'<g fill="none" stroke="{fill}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">{legs}</g>'
        f'<circle cx="{ex}" cy="{ey}" r="{er}" fill="{eye_fill}"/>'
        f'</g>'
    )


def voyage(stroke, dx=0, dy=0, s=1.0):
    """The ground line doubles as the voyage: a swell rising towards the kiwi's feet."""
    return (
        f'<path transform="translate({dx} {dy}) scale({s})" d="M4 116 C30 104 54 118 80 110 C100 104 116 108 132 104" '
        f'fill="none" stroke="{stroke}" stroke-width="5" stroke-linecap="round"/>'
    )


def mark(bird, eye, stars, swell, dx=0, dy=0, s=1.0):
    return (
        f'<g transform="translate({dx} {dy}) scale({s})">'
        f'<path d="{southern_cross(26, 8)}" fill="{stars}"/>'
        f'{kiwi(bird, eye)}'
        f'{voyage(swell)}'
        f'</g>'
    )


def write(name, svg):
    (OUT / name).write_text(svg.strip() + '\n', encoding='utf-8')
    print('wrote', name)


def lockup(name, title_id, word1, word2, tag, bird, eye, stars, swell, tagline=True):
    f800 = FONTS / 'outfit-800.woff'
    f600 = FONTS / 'outfit-600.woff'
    d1, w1 = text_path(f800, 'removals', 40, 139, 56, tracking=-0.8)
    d2, w2 = text_path(f800, 'to NZ', 40, 139, 92, tracking=-0.6)
    d3, w3 = text_path(f600, 'DOOR TO DOOR TO NEW ZEALAND', 10.5, 141, 112, tracking=1.3)
    width = 141 + max(w1, w2, w3) + 6
    svg = f'''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.0f} 124" width="{width:.0f}" height="124" role="img" aria-labelledby="{title_id}">
  <title id="{title_id}">Removals to NZ</title>
  {mark(bird, eye, stars, swell, 0, 0, 1)}
  <path d="{d1}" fill="{word1}"/>
  <path d="{d2}" fill="{word2}"/>
  {f'<path d="{d3}" fill="{tag}"/>' if tagline else ''}
</svg>'''
    write(name, svg)
    return width


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    # Header lockup: no tagline — at header size it would render at ~5px.
    w = lockup('removals-to-nz-lockup.svg', 'rtnz-lockup', NIGHT, SEA, MUTED, NIGHT, '#FFFFFF', GOLD, TEAL, tagline=False)
    lockup('removals-to-nz-logo.svg', 'rtnz-logo', NIGHT, SEA, MUTED, NIGHT, '#FFFFFF', GOLD, TEAL)
    lockup('removals-to-nz-logo-reversed.svg', 'rtnz-logo-rev', MIST, TEAL_LIGHT, MUTED_REV, MIST, NIGHT, GOLD, TEAL)

    write('removals-to-nz-mark.svg', f'''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 124" width="136" height="124" role="img" aria-label="Removals to NZ">
  {mark(NIGHT, '#FFFFFF', GOLD, TEAL)}
</svg>''')

    # App icon / favicon: a bigger kiwi in mist on a dusk-to-night tile, under
    # larger gold stars. No swell — it is lost below 32px.
    write('favicon.svg', f'''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="{DUSK}"/><stop offset="1" stop-color="{NIGHT}"/></linearGradient></defs>
  <rect width="128" height="128" rx="28" fill="url(#g)"/>
  <path d="{southern_cross(24, 12, 1.25)}" fill="{GOLD}"/>
  {kiwi(MIST, NIGHT, -6, 6, 1.08)}
</svg>''')
    print('lockup width', round(w))


if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""
Generate the Removals to NZ mark — an International Moving Company (IMC) division.

The mark is built in the IMC construction, measured from the parent artwork
(internationalmoving.company/imc-mark.png, cap height 220 units):

  * heavy geometric capitals, stems 66 units wide (0.30 of cap height)
  * a letter whose inner stroke stops short, leaving a doorway beneath it
  * a teal door leaf standing just inside the left jamb, swung open, drawn in
    perspective: taller at the hinge, top and bottom converging

In IMC the doorway sits under the M's chevron. Here the N's diagonal ends
part-way down the right stem, and the doorway opens beneath it — the same
device, so the division reads as family at a glance: an open door, a move
home. Pure vector, on a transparent ground (the parent's raster mark has an
ivory field; this does not).

Colours are the IMC tokens (internationalmoving.company/brand/):
  ink #142D3B · accent #167D8D · paper #F6F3ED · light accent #A7D2CE

    python3 scripts/brand/logo.py

Writes to src/assets/img/. The company name beside the mark is live HTML text
on the site (as IMC does), so no font is embedded in the mark.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'src' / 'assets' / 'img'

INK = '#142D3B'
TEAL = '#167D8D'
PAPER = '#F6F3ED'
LIGHT = '#A7D2CE'

CAP = 220      # cap height, as IMC
STEM = 66      # stem width, as IMC
GAP = 36       # letter spacing, as IMC's I–M gap


def poly(points):
    return 'M' + ' L'.join(f'{x:g} {y:g}' for x, y in points) + ' Z'


def letter_n(x0=0):
    """N: two stems; the diagonal stops on the right stem; a doorway beneath."""
    w = 250
    l_in, r_in = x0 + STEM, x0 + w - STEM
    # Diagonal band. Top edge from the top of the left stem's inner face down to
    # the right stem; bottom edge shallower, so the band narrows towards the
    # right exactly as IMC's chevron narrows towards its centre.
    top_r, bot_l, bot_r = 96, 66, 136
    left_stem = poly([(x0, 0), (l_in, 0), (l_in, CAP), (x0, CAP)])
    right_stem = poly([(r_in, 0), (x0 + w, 0), (x0 + w, CAP), (r_in, CAP)])
    band = poly([(l_in - 1, 0), (r_in + 1, top_r), (r_in + 1, bot_r), (l_in - 1, bot_l)])
    # Door leaf: 17 units off the hinge jamb, 40 wide, top edge parallel to the
    # lintel above it, bottom rising — the perspective of IMC's leaf.
    slope = (bot_r - bot_l) / (r_in - l_in)
    lx = l_in + 17
    rx = lx + 40
    gap = 15
    leaf = poly([
        (lx, bot_l + slope * (lx - l_in) + gap),
        (rx, bot_l + slope * (rx - l_in) + gap),
        (rx, CAP - 17),
        (lx, CAP - 4),
    ])
    return f'{left_stem} {right_stem} {band}', leaf, w


def letter_z(x0):
    w = 222
    bar = 56
    diag = 94   # horizontal width of the diagonal; ~62 perpendicular
    d = poly([
        (x0, 0), (x0 + w, 0), (x0 + w, bar),
        (x0 + diag, CAP - bar), (x0 + w, CAP - bar), (x0 + w, CAP),
        (x0, CAP), (x0, CAP - bar), (x0 + w - diag, bar), (x0, bar),
    ])
    return d, w


def mark_paths(ink=INK, teal=TEAL):
    n, leaf, wn = letter_n(0)
    z, wz = letter_z(wn + GAP)
    width = wn + GAP + wz
    body = f'<path d="{n} {z}" fill="{ink}"/><path d="{leaf}" fill="{teal}"/>'
    return body, width


def write(name, svg):
    (OUT / name).write_text(svg.strip() + '\n', encoding='utf-8')
    print('wrote', name)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    pad = 0
    body, w = mark_paths()
    write('rtnz-mark.svg', f'''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-pad} {-pad} {w + 2 * pad} {CAP + 2 * pad}" width="{w}" height="{CAP}" role="img" aria-label="Removals to NZ">
  {body}
</svg>''')

    # On dark surfaces the parent backs its mark on a paper panel rather than
    # reversing it. With a vector master we can do both; this is the reversed
    # variant, for footers and dark photography only.
    body_rev, _ = mark_paths(ink=PAPER, teal=LIGHT)
    write('rtnz-mark-reversed.svg', f'''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {CAP}" width="{w}" height="{CAP}" role="img" aria-label="Removals to NZ">
  {body_rev}
</svg>''')

    # Favicon: the N alone — its door is the recognisable part at 16px.
    n, leaf, wn = letter_n(0)
    s = 100 / CAP
    write('favicon.svg', f'''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <rect width="128" height="128" rx="14" fill="{PAPER}"/>
  <g transform="translate({(128 - wn * s) / 2:.2f} 14) scale({s:.4f})">
    <path d="{n}" fill="{INK}"/><path d="{leaf}" fill="{TEAL}"/>
  </g>
</svg>''')
    print('mark', w, 'x', CAP)


if __name__ == '__main__':
    main()

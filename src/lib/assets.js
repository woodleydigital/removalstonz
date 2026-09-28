/**
 * Content-hashed asset registry.
 *
 * WHY THIS EXISTS: images on stable filenames with a long cache mean a changed
 * logo stays invisible to returning visitors until their cache expires (this
 * happened on removalstochina.com). CSS and JS were already hashed.
 *
 * Now every image is emitted as `name.<hash>.ext`, so changing a file changes
 * its URL and no cache can serve the old one. That in turn lets images be
 * cached immutably for a year rather than a cautious week, which is the better
 * trade in both directions.
 *
 * `asset()` returns null for a path with no file behind it, so callers can omit
 * the tag rather than emit a link to a 404.
 */

let manifest = new Map();

/** Called once by the build, before any page is rendered. */
export function setAssetManifest(entries) {
  manifest = new Map(entries);
}

/**
 * Resolve a logical path such as `/img/logo.svg` to its hashed public path.
 * Returns null when no such file was built.
 */
export function asset(logicalPath) {
  if (!logicalPath) return null;
  const e = manifest.get(logicalPath);
  return e ? e.src : null;
}

/**
 * Intrinsic pixel dimensions of a built image, read from the file itself at
 * build time. Emitting these as width/height attributes reserves the exact box
 * the image will occupy, so a lazily-loaded logo cannot shift the layout — and
 * because they are read from the file, they cannot drift from it the way a
 * hand-written aspect ratio can. Returns null when unknown.
 */
export function assetSize(logicalPath) {
  const e = manifest.get(logicalPath);
  return e && e.width ? { width: e.width, height: e.height } : null;
}

/** Both at once, for the common case of rendering an <img>. */
export function assetImg(logicalPath) {
  const e = manifest.get(logicalPath);
  if (!e) return null;
  return { src: e.src, width: e.width || null, height: e.height || null };
}

/**
 * Resolve a logical path without an extension against the extensions we accept,
 * in preference order. Used for partner-supplied logos, which may arrive as any
 * of svg, png or webp.
 */
export function assetAnyExt(basePathNoExt, exts = ['svg', 'png', 'webp']) {
  for (const ext of exts) {
    const hit = assetImg(`${basePathNoExt}.${ext}`);
    if (hit) return hit;
  }
  return null;
}

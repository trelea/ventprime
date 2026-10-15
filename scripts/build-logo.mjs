/**
 * Wraps the prepared transparent logo into `public/logo.svg`.
 *
 * The brand artwork is a raster 3D render, so it cannot be faithfully
 * represented as vector paths. Rather than ship a hand-drawn approximation
 * (which would not be the real logo), the exact artwork is embedded losslessly
 * as a base64 PNG inside an SVG container — so consumers that require an
 * `.svg` logo URL, such as schema.org `logo`, get the genuine artwork.
 *
 * `public/logo.png` and the responsive `.webp` files remain the primary assets
 * used on the site itself via `next/image`.
 *
 * Usage: npm run logo
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  const source = path.join(ROOT, "public", "logo.png");
  const png = await readFile(source);

  // dimensions come from the PNG header (IHDR), avoiding an image dependency
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="VENTPRIME — ventilație naturală">
  <title>VENTPRIME — ventilație naturală</title>
  <image width="${width}" height="${height}" href="data:image/png;base64,${png.toString("base64")}"/>
</svg>
`;

  await writeFile(path.join(ROOT, "public", "logo.svg"), svg);
  console.log(
    `wrote public/logo.svg (${width}×${height}, ${(svg.length / 1024).toFixed(0)} KB)`,
  );
}

main();
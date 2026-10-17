/**
 * Downloads the Unsplash photos referenced by `lib/images.ts`, converts them
 * to WebP at the widths the site actually serves, and writes them to
 * `public/images/`.
 *
 * Usage:
 *   node scripts/fetch-images.mjs            # only fetch what is missing
 *   node scripts/fetch-images.mjs --force    # re-fetch everything
 *
 * Photos are resolved through Unsplash's public `/download` endpoint, which
 * redirects to the CDN and supports a width parameter — so we never need an
 * API key.
 */

import { execFile } from "node:child_process";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "images");
const TMP_DIR = path.join(ROOT, ".cache", "images");

/**
 * Master width. `next/image` derives the responsive `deviceSizes` variants at
 * request time, so only a single master per photo is stored.
 */
const MASTER_WIDTH = 2000;

const FORCE = process.argv.includes("--force");

/**
 * name → Unsplash photo id (the short id at the end of the photo page URL).
 * Keep this in sync with `lib/images.ts`.
 */
const PHOTOS = {
  "hero-home-interior": "2cfj0Y5ch00",
  "hero-house-exterior": "40fiwxjjlaQ",
  "service-ventilatie-pasiva": "ItJsBJlf5Qw",
  "service-ventilatie-fortata": "72qigghlVkI",
  "service-tratare-mucegai": "1qeTU99G07Q",
  // TODO(client): replace with a real diamond-drilling photo — currently the
  // old basement shot, kept so the four-service catalog is complete.
  "service-foraj-diamantat": "vJmlEqowqb8",
  "service-ozonizare-incaperi": "7PTD99F8oUk",
  "about-installation": "b0U5yvj7A7I",
  "about-attic": "XEkGi2wElsc",
  "tech-ductwork": "4ZRCRIvfhoQ",
  "tech-facade": "MxEgFRAWU60",
  "tech-condensation": "ZisSo0slonk",
  "project-1-before": "4yJ9Hsfvlc8",
  "project-1-after": "tPz3Lhh3z_4",
  "project-2-before": "tGn1KGrUKj4",
  "project-2-after": "A9DmoCgM5iw",
  // Open Graph images are always cropped to 1200x630 (AGENTS.md §5.9).
  "og-image": "tPz3Lhh3z_4",
};

async function download(id, width) {
  const url = `https://unsplash.com/photos/${id}/download?w=${width}`;
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`${id}: HTTP ${response.status}`);
  }

  const type = response.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) {
    throw new Error(`${id}: unexpected content-type ${type}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function toWebp(source, target) {
  await execFileAsync("magick", [
    source,
    "-auto-orient",
    "-strip",
    "-quality",
    "82",
    "-define",
    "webp:method=6",
    target,
  ]);
}

/** Read intrinsic dimensions so `lib/images.ts` can pin width/height. */
async function dimensions(file) {
  const { stdout } = await execFileAsync("magick", [
    "identify",
    "-format",
    "%w %h",
    `${file}[0]`,
  ]);
  const [width, height] = stdout.trim().split(/\s+/).map(Number);
  return { width, height };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(TMP_DIR, { recursive: true });

  const existing = new Set(await readdir(OUT_DIR).catch(() => []));
  const manifest = {};

  for (const [name, id] of Object.entries(PHOTOS)) {
    const target = path.join(OUT_DIR, `${name}.webp`);

    if (!FORCE && existing.has(`${name}.webp`)) {
      manifest[name] = await dimensions(target);
      console.log(`skip  ${name} (exists)`);
      continue;
    }

    const source = path.join(TMP_DIR, `${name}.jpg`);

    try {
      // 2400px master, then downscale locally — one request per photo.
      await writeFile(source, await download(id, MASTER_WIDTH));

      if (name === "og-image") {
        await execFileAsync("magick", [
          source,
          "-auto-orient",
          "-resize",
          "1200x630^",
          "-gravity",
          "center",
          "-extent",
          "1200x630",
          "-strip",
          "-quality",
          "82",
          "-define",
          "webp:method=6",
          target,
        ]);
        manifest[name] = { width: 1200, height: 630 };
        console.log(`ok    ${name} (${id}) 1200x630 (og crop)`);
        continue;
      }

      await toWebp(source, target);

      manifest[name] = await dimensions(target);
      console.log(`ok    ${name} (${id}) ${manifest[name].width}x${manifest[name].height}`);
    } catch (error) {
      console.error(`FAIL  ${name} (${id}): ${error.message}`);
      process.exitCode = 1;
    }
  }

  await writeFile(
    path.join(ROOT, ".cache", "images", "dimensions.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
}

main();
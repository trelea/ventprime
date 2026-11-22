#!/usr/bin/env node
/**
 * Submit every URL in the site's sitemap to IndexNow.
 * IndexNow forwards the notification to participating search engines
 * (Bing, Yandex, Naver, Seznam, Yep).
 *
 * Usage:
 *   node scripts/indexnow.mjs [--dry-run] [--site-url https://ventprime.md]
 *                             [--key-file public/<key>.txt]
 */

import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

const args = process.argv.slice(2);

function option(name, envName, fallback) {
  const index = args.indexOf(name);
  if (index !== -1 && args[index + 1] && !args[index + 1].startsWith("--")) {
    return args[index + 1];
  }
  return process.env[envName] ?? fallback;
}

const siteUrl = option(
  "--site-url",
  "SITE_URL",
  "https://ventprime.md",
).replace(/\/$/, "");
const apiUrl = option(
  "--api-url",
  "INDEXNOW_API_URL",
  "https://api.indexnow.org/indexnow",
);
const dryRun = args.includes("--dry-run");

/** Find the hosted key file (name and contents must match) in public/. */
async function resolveKeyFile() {
  const explicit = option("--key-file", "INDEXNOW_KEY_FILE", null);
  if (explicit) return resolve(explicit);

  const publicDir = resolve("public");
  const candidates = (await readdir(publicDir)).filter((name) =>
    /^[a-f0-9]{32}\.txt$/i.test(name),
  );
  for (const name of candidates) {
    const path = resolve(publicDir, name);
    const contents = (await readFile(path, "utf8")).trim();
    if (contents === name.replace(/\.txt$/, "")) return path;
  }
  throw new Error(
    "No IndexNow key file found in public/ (a <32-hex-key>.txt file whose contents match its name).",
  );
}

async function main() {
  const keyFilePath = await resolveKeyFile();
  const key = (await readFile(keyFilePath, "utf8")).trim();

  const sitemapUrl = `${siteUrl}/sitemap.xml`;
  const sitemapResponse = await fetch(sitemapUrl);
  if (!sitemapResponse.ok) {
    throw new Error(`Could not fetch ${sitemapUrl}: ${sitemapResponse.status}`);
  }

  const xml = await sitemapResponse.text();
  const urls = [
    ...new Set(
      [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
        .map((match) => match[1])
        .filter((url) => url.startsWith(siteUrl)),
    ),
  ];
  if (urls.length === 0) {
    throw new Error(`No URLs found in ${sitemapUrl}`);
  }

  const payload = {
    host: new URL(siteUrl).host,
    key,
    urlList: urls,
  };

  console.log(`Key file: ${keyFilePath}`);
  console.log(`Submitting ${urls.length} URLs from ${sitemapUrl}`);
  for (const url of urls) console.log(`  - ${url}`);

  if (dryRun) {
    console.log("Dry run — nothing was submitted.");
    return;
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const body = await response.text();
  console.log(`IndexNow response: ${response.status} ${response.statusText}`);
  if (body) console.log(body);
  if (!response.ok) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`IndexNow submission failed: ${error.message}`);
  process.exitCode = 1;
});

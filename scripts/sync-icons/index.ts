// Usage: FIGMA_TOKEN=xxx node scripts/sync-icons/index.ts [--force]

import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { collectIcons, fetchFileNode, fetchSvgUrls } from "./figma.ts";
import { generateIcons } from "./generate.ts";
import { downloadSvg } from "./svg.ts";

const SCRIPT_DIR = join(fileURLToPath(import.meta.url), "..");

function loadIgnoreList(): Set<string> {
  try {
    return new Set(
      readFileSync(join(SCRIPT_DIR, ".syncignore"), "utf8")
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#")),
    );
  } catch {
    return new Set();
  }
}

const TOKEN = process.env.FIGMA_TOKEN;
if (!TOKEN) {
  throw new Error("FIGMA_TOKEN env variable is required");
}

const FORCE = process.argv.includes("--force");
const FILE_KEY = "BWW9MBiu5dHwUb8ENACEmi";
const ICONS_PAGE_NODE = "37:623";
const OUT_DIR = join(fileURLToPath(import.meta.url), "../../../src/icons");

async function main() {
  const ignored = loadIgnoreList();
  console.log("Fetching icon page from Figma...");
  const root = await fetchFileNode(TOKEN!, FILE_KEY, ICONS_PAGE_NODE);
  if (!root) throw new Error("Could not find icon page node");

  const icons = collectIcons(root);
  console.log(`Found ${icons.length} icons`);

  const svgMap = await fetchSvgUrls(
    TOKEN!,
    FILE_KEY,
    icons.map((ic) => ic.id),
  );

  mkdirSync(OUT_DIR, { recursive: true });

  const toSync = icons.filter(({ name }) => !ignored.has(name.replace(/^icon-/, "")));
  if (ignored.size > 0) console.log(`Ignoring ${icons.length - toSync.length} icons (.syncignore)`);

  const settled = await Promise.allSettled(
    toSync.map(({ id, name }) => {
      const filename = name.replace(/^icon-/, "");
      const url = svgMap[id];
      if (!url) return Promise.reject(new Error(`${filename}: no URL`));
      return downloadSvg(url, filename, OUT_DIR, FORCE).then((result) => ({ filename, result }));
    }),
  );

  let added = 0;
  let updated = 0;
  let pending = 0;
  let fail = 0;
  for (const s of settled) {
    if (s.status === "fulfilled") {
      const { filename, result } = s.value;
      if (result === "new") {
        console.log(`  + ${filename}.svg`);
        added++;
      } else if (result === "written") {
        console.log(`  ↑ ${filename}.svg`);
        updated++;
      } else if (result === "pending") {
        pending++;
      }
    } else {
      console.warn(`  skip ${s.reason}`);
      fail++;
    }
  }

  const unchanged = settled.length - added - updated - pending - fail;
  const parts = [
    added > 0 && `${added} new`,
    updated > 0 && `${updated} updated`,
    unchanged > 0 && `${unchanged} unchanged`,
    pending > 0 && `${pending} pending`,
    ignored.size > 0 && `${icons.length - toSync.length} ignored`,
    fail > 0 && `${fail} failed`,
  ].filter(Boolean);
  console.log(`\nDone: ${parts.join(", ")}`);
  if (pending > 0) {
    console.log(`Run with --force to apply ${pending} pending update(s)`);
  }

  const count = generateIcons(OUT_DIR);
  console.log(`Written ${count} icons to src/icons/index.ts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

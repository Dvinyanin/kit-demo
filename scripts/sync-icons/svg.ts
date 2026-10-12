import { writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type SvgResult = "new" | "written" | "unchanged" | "pending";

function renameSvgIds(svg: string, iconName: string): string {
  const idMap = new Map<string, string>();
  let counter = 0;
  for (const [, id] of svg.matchAll(/\bid="([^"]+)"/g)) {
    if (!idMap.has(id)) idMap.set(id, `${iconName}-${counter++}`);
  }
  if (idMap.size === 0) return svg;

  const remap = (id: string) => idMap.get(id) ?? id;
  return svg
    .replace(/\bid="([^"]+)"/g, (_, id) => `id="${remap(id)}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${remap(id)})`)
    .replace(
      /(xlink:)?href="#([^"]+)"/g,
      (_, prefix: string, id: string) => `${prefix ?? ""}href="#${remap(id)}"`,
    );
}

export async function downloadSvg(
  url: string,
  filename: string,
  outDir: string,
  force = false,
): Promise<SvgResult> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  let svg = await res.text();
  svg = svg.replace(/\s+width="[^"]*"/, "").replace(/\s+height="[^"]*"/, "");
  svg = svg.replace(/\s*\bfill="(currentColor|black|#000|#000000)"/gi, "");
  svg = renameSvgIds(svg, filename);

  const path = join(outDir, `${filename}.svg`);
  const existing = await readFile(path, "utf8").catch(() => null);

  if (existing === svg) return "unchanged";
  if (existing !== null && !force) return "pending";

  writeFileSync(path, svg);
  return existing === null ? "new" : "written";
}

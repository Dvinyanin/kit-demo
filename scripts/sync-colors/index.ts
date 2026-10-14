// Usage: node scripts/sync-colors/index.ts
// Reads .tmp/Value.tokens.json, .tmp/Light 🍋.tokens.json, .tmp/Dark 🍊.tokens.json
// and generates src/theme/colors.css, src/theme/light.css, src/theme/dark.css

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = join(fileURLToPath(import.meta.url), "..");
const ROOT_DIR = join(SCRIPT_DIR, "../..");
const TMP_DIR = join(ROOT_DIR, ".tmp");
const THEME_DIR = join(ROOT_DIR, "src/theme");

const PRIMITIVES = {
  input: join(TMP_DIR, "Value.tokens.json"),
  output: join(THEME_DIR, "colors.css"),
};

const THEMES = [
  {
    input: join(TMP_DIR, "Light 🍋.tokens.json"),
    output: join(THEME_DIR, "light.css"),
    selector: ":root",
  },
  {
    input: join(TMP_DIR, "Dark 🍊.tokens.json"),
    output: join(THEME_DIR, "dark.css"),
    selector: '[data-theme="dark"]',
  },
] as const;

type TokenNode = {
  $value?: { components: number[]; alpha: number; hex: string };
  $extensions?: {
    "com.figma.codeSyntax"?: { WEB?: string };
    "com.figma.aliasData"?: { targetVariableName?: string } | string;
  };
  [key: string]: unknown;
};

function loadJson(path: string): TokenNode {
  const raw = readFileSync(path, "utf-8");
  return JSON.parse(raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw);
}

function loadIgnoreList(): string[] {
  const raw = readFileSync(join(SCRIPT_DIR, ".syncignore"), "utf-8");
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

function toColor(value: TokenNode["$value"]): string | null {
  if (!value || !Array.isArray(value.components)) return null;
  const {
    components: [r, g, b],
    alpha,
    hex,
  } = value;
  if (alpha === 0) return "transparent";
  if (alpha === 1)
    return `#${hex.slice(1).toUpperCase() === hex.slice(1) ? hex.slice(1) : hex.slice(1).toUpperCase()}`;
  const r8 = Math.round(r * 255);
  const g8 = Math.round(g * 255);
  const b8 = Math.round(b * 255);
  return `rgba(${r8}, ${g8}, ${b8}, ${+alpha.toFixed(2)})`;
}

function webVar(node: TokenNode): string | null {
  const web = node.$extensions?.["com.figma.codeSyntax"]?.WEB;
  if (!web) return null;
  return web.replace(/^var\(/, "").replace(/\)$/, "");
}

type FlatToken = {
  varName: string;
  value: TokenNode["$value"];
  alias: string | null;
};

function flatten(
  obj: TokenNode,
  ignoreList: string[],
  usedIgnore: Set<string>,
  path = "",
): FlatToken[] {
  const results: FlatToken[] = [];

  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const node = val as TokenNode;
    const currentPath = path ? `${path}/${key}` : key;

    const ignored = ignoreList.find((prefix) => currentPath.startsWith(prefix));
    if (ignored) {
      usedIgnore.add(ignored);
      continue;
    }

    if (node.$value !== undefined) {
      const varName = webVar(node);
      if (!varName) continue;
      if (!Array.isArray((node.$value as TokenNode["$value"])?.components)) continue;
      const aliasData = node.$extensions?.["com.figma.aliasData"];
      const alias =
        typeof aliasData === "string" ? aliasData : (aliasData?.targetVariableName ?? null);
      results.push({ varName, value: node.$value, alias });
    } else {
      results.push(...flatten(node, ignoreList, usedIgnore, currentPath));
    }
  }

  return results;
}

function generateCss(
  selector: string,
  tokens: FlatToken[],
  primitiveMap: Map<string, string>,
): string {
  const lines = [`${selector} {`];

  for (const { varName, value, alias } of tokens) {
    let cssValue: string;
    if (alias) {
      const primitiveVar = primitiveMap.get(alias);
      cssValue = primitiveVar ? `var(${primitiveVar})` : (toColor(value) ?? "unset");
    } else {
      cssValue = toColor(value) ?? "unset";
    }
    lines.push(`  ${varName}: ${cssValue};`);
  }

  lines.push("}");
  return lines.join("\n") + "\n";
}

function flattenWithPath(
  obj: TokenNode,
  path = "",
  ignoreList: string[] = [],
  usedIgnore: Set<string> = new Set(),
): Array<FlatToken & { figmaPath: string }> {
  const results: Array<FlatToken & { figmaPath: string }> = [];
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const node = val as TokenNode;
    const currentPath = path ? `${path}/${key}` : key;
    const ignored = ignoreList.find((prefix) => currentPath.startsWith(prefix));
    if (ignored) {
      usedIgnore.add(ignored);
      continue;
    }
    if (node.$value !== undefined) {
      const varName = webVar(node);
      if (!varName) continue;
      if (!Array.isArray((node.$value as TokenNode["$value"])?.components)) continue;
      results.push({ figmaPath: currentPath, varName, value: node.$value, alias: null });
    } else {
      results.push(...flattenWithPath(node, currentPath, ignoreList, usedIgnore));
    }
  }
  return results;
}

function main() {
  const ignoreList = loadIgnoreList();
  const usedIgnore = new Set<string>();

  // --- colors.css (primitives) ---
  const primitives = flattenWithPath(loadJson(PRIMITIVES.input), "", ignoreList, usedIgnore);
  const primitiveMap = new Map(primitives.map(({ figmaPath, varName }) => [figmaPath, varName]));

  const colorsCss =
    "/* Auto-generated from Value.tokens.json — do not edit manually */\n\n" +
    generateCss(":root", primitives, primitiveMap);
  writeFileSync(PRIMITIVES.output, colorsCss);
  console.log(`✓ colors.css — ${primitives.length} tokens`);

  // --- light.css / dark.css ---
  for (const { input, output, selector } of THEMES) {
    const name = output.split(/[\\/]/).pop()!;
    const tokens = flatten(loadJson(input), ignoreList, usedIgnore, "");
    const css =
      `/* Auto-generated from ${input.split(/[\\/]/).pop()} — do not edit manually */\n\n` +
      generateCss(selector, tokens, primitiveMap);
    writeFileSync(output, css);
    console.log(`✓ ${name} — ${tokens.length} tokens`);
  }

  // --- warn about unused ignore entries ---
  for (const entry of ignoreList) {
    if (!usedIgnore.has(entry)) {
      console.warn(`⚠ Ignore entry not found: "${entry}" — можно удалить из .syncignore`);
    }
  }
}

main();

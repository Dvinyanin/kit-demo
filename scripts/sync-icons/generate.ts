import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RESERVED = new Set([
  "import",
  "export",
  "default",
  "class",
  "return",
  "function",
  "var",
  "let",
  "const",
  "if",
  "else",
  "for",
  "while",
  "break",
  "continue",
  "new",
  "delete",
  "typeof",
  "void",
  "in",
  "of",
  "from",
  "as",
  "type",
]);

function toIdent(name: string): string {
  // eslint-disable-next-line no-control-regex
  const ascii = name.replace(/[^\x00-\x7F]/g, "x");
  const camel = ascii.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
  return RESERVED.has(camel) ? `_${camel}` : camel;
}

export function generateIcons(iconsDir: string): number {
  const names = readdirSync(iconsDir)
    .filter((f) => f.endsWith(".svg"))
    .map((f) => f.slice(0, -4))
    .sort((a, b) => a.localeCompare(b));

  const lines = [
    ...names.map((name) => `import ${toIdent(name)} from "./${name}.svg?raw";`),
    "",
    "export const icons = {",
    ...names.map((name) => `  "${name}": ${toIdent(name)},`),
    "};",
    "",
    "export type IconName = keyof typeof icons;",
    "",
  ];

  writeFileSync(join(iconsDir, "index.ts"), lines.join("\n"));
  return names.length;
}

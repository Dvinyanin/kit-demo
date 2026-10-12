const FIGMA_FILES = {
  webComponents: "BWW9MBiu5dHwUb8ENACEmi",
  core: "yu7J1b0um9Q8th1VQWUWBP",
  showcase: "GmAU0pPfs0WxcKNJyApuD0",
} as const;

export function figmaUrl(file: keyof typeof FIGMA_FILES, nodeId: string) {
  return `https://www.figma.com/design/${FIGMA_FILES[file]}?node-id=${nodeId}`;
}

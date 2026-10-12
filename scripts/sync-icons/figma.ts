import type { GetFileNodesResponse, GetImagesResponse, Node } from "@figma/rest-api-spec";

const FIGMA_API = new URL("https://api.figma.com/v1/");

export async function figmaGet<T>(token: string, url: URL): Promise<T> {
  const res = await fetch(url, { headers: { "X-Figma-Token": token } });
  if (!res.ok) throw new Error(`Figma API error ${res.status}: ${url.pathname}`);
  return res.json();
}

function findDefaultVariant(set: Node & { children: Node[] }): Node | undefined {
  // Prefer variant explicitly marked as default (name contains "Default")
  return set.children.find((c) => c.name.includes("Default")) ?? set.children[0];
}

export function collectIcons(node: Node, acc: { id: string; name: string }[] = []) {
  if (node.type === "COMPONENT" && node.name.startsWith("icon-")) {
    acc.push({ id: node.id, name: node.name });
  } else if (node.type === "COMPONENT_SET" && node.name.startsWith("icon-") && "children" in node) {
    const variant = findDefaultVariant(node as Node & { children: Node[] });
    if (variant) acc.push({ id: variant.id, name: node.name });
  }
  if ("children" in node) {
    for (const child of node.children) collectIcons(child, acc);
  }
  return acc;
}

export async function fetchFileNode(token: string, fileKey: string, nodeId: string) {
  const url = new URL(`files/${fileKey}/nodes`, FIGMA_API);
  url.searchParams.set("ids", nodeId);
  url.searchParams.set("depth", "10");
  const { nodes } = await figmaGet<GetFileNodesResponse>(token, url);
  return nodes[nodeId.replace("-", ":")]?.document;
}

export async function fetchSvgUrls(
  token: string,
  fileKey: string,
  iconIds: string[],
): Promise<Record<string, string>> {
  const svgMap: Record<string, string> = {};
  for (let i = 0; i < iconIds.length; i += 100) {
    const url = new URL(`images/${fileKey}`, FIGMA_API);
    url.searchParams.set("ids", iconIds.slice(i, i + 100).join(","));
    url.searchParams.set("format", "svg");
    const { images } = await figmaGet<GetImagesResponse>(token, url);
    Object.assign(svgMap, images);
  }
  return svgMap;
}

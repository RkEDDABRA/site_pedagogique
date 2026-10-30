// Lookup table for intrinsic image dimensions, used to reserve layout space
// (width/height attributes) and avoid layout shift while images lazy-load.
// Sources:
//  - src/assets/imageDims.json (measured pixel sizes, keys relative to src/)
//  - import.meta.glob (resolves local image files AND CDN asset pointers
//    (*.asset.json) to their final URLs, identical in dev and production).
import rawDims from "@/assets/imageDims.json";

interface AssetPointer {
  url: string;
  original_filename?: string;
}

const dims = rawDims as unknown as Record<string, [number, number]>;

const byUrl = new Map<string, [number, number]>();

const imageModules = import.meta.glob("/src/assets/**/*.{png,jpg,jpeg,webp,gif,svg}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

for (const [path, url] of Object.entries(imageModules)) {
  const rel = path.replace(/^\/src\//, "");
  const key = rel.replace(/^assets\//, "");
  const d = dims[key] ?? dims[rel];
  if (d) byUrl.set(url, d);
}

const pointerModules = import.meta.glob("/src/assets/**/*.asset.json", {
  eager: true,
  import: "default",
}) as Record<string, AssetPointer>;

for (const pointer of Object.values(pointerModules)) {
  if (!pointer?.url || !pointer?.original_filename) continue;
  const match = Object.entries(dims).find(([key]) => key.endsWith("/" + pointer.original_filename));
  if (match) byUrl.set(pointer.url, match[1]);
}

export function dimsFor(url: string | undefined): { width?: number; height?: number } {
  if (!url) return {};
  const d = byUrl.get(url);
  return d ? { width: d[0], height: d[1] } : {};
}

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = path.join(root, "src", "data", "defaultSongs.ts");
const publicPath = path.join(root, "public");
const source = fs.readFileSync(registryPath, "utf8");
const entries = [...source.matchAll(/\{\s*id:\s*(\d+),([\s\S]*?)\n\s*\},/g)].map(
  ([, id, body]) => ({
    id: Number(id),
    src: body.match(/src:\s*"([^"]+)"/)?.[1],
    cover: body.match(/cover:\s*"([^"]+)"/)?.[1],
  }),
);

const errors = [];
const ids = new Set();
const sources = new Set();

for (const entry of entries) {
  if (ids.has(entry.id)) {
    errors.push(`Duplicate song ID: ${entry.id}`);
  }
  ids.add(entry.id);

  if (!entry.src) {
    errors.push(`Song ${entry.id} has no audio source`);
  } else {
    if (sources.has(entry.src.toLowerCase())) {
      errors.push(`Duplicate audio source: ${entry.src}`);
    }
    sources.add(entry.src.toLowerCase());
    const audioPath = path.join(publicPath, entry.src.replace(/^\//, "").replaceAll("/", path.sep));
    if (!fs.existsSync(audioPath)) {
      errors.push(`Missing audio asset for song ${entry.id}: ${entry.src}`);
    }
  }

  if (!entry.cover) {
    errors.push(`Song ${entry.id} has no cover`);
  } else {
    const coverPath = path.join(publicPath, entry.cover.replace(/^\//, "").replaceAll("/", path.sep));
    if (!fs.existsSync(coverPath)) {
      errors.push(`Missing cover asset for song ${entry.id}: ${entry.cover}`);
    }
  }
}

if (entries.length === 0) {
  errors.push("No songs were found in the default song registry");
}

if (errors.length > 0) {
  console.error(`Catalog validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Catalog valid: ${entries.length} songs, ${sources.size} unique audio assets`);
}

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = path.join(root, "src", "data", "defaultSongs.ts");
const publicPath = path.join(root, "public");
const musicPath = path.join(publicPath, "music");
const requireLocalAudio = process.argv.includes("--require-local-audio");
const checkLocalAudio = requireLocalAudio || fs.existsSync(musicPath);

if (!fs.existsSync(registryPath)) {
  console.error(`Song registry not found: ${registryPath}`);
  process.exit(1);
}

const source = fs.readFileSync(registryPath, "utf8");
const entries = [...source.matchAll(/\{\s*id:\s*(\d+),([\s\S]*?)\n\s*\},/g)].map(
  ([, id, body]) => ({
    id: Number(id),
    src: body.match(/src:\s*"([^"]+)"/)?.[1],
    cover: body.match(/cover:\s*"([^"]+)"/)?.[1],
    lrc: body.match(/lrc:\s*"([^"]+)"/)?.[1],
  }),
);

const errors = [];
const ids = new Set();
const sources = new Set();

function resolvePublicAsset(assetPath) {
  const relativePath = assetPath.replace(/^\/+/, "");
  const resolvedPath = path.resolve(publicPath, relativePath.replaceAll("/", path.sep));
  if (resolvedPath !== publicPath && !resolvedPath.startsWith(`${publicPath}${path.sep}`)) {
    return null;
  }
  return resolvedPath;
}

for (const entry of entries) {
  if (ids.has(entry.id)) {
    errors.push(`Duplicate song ID: ${entry.id}`);
  }
  ids.add(entry.id);

  if (!entry.src) {
    errors.push(`Song ${entry.id} has no audio source`);
  } else {
    const normalizedSrc = entry.src.trim().toLowerCase();
    if (sources.has(normalizedSrc)) {
      errors.push(`Duplicate audio source: ${entry.src}`);
    }
    sources.add(normalizedSrc);

    if (checkLocalAudio && !/^https?:\/\//i.test(entry.src)) {
      const audioPath = resolvePublicAsset(entry.src);
      if (!audioPath) {
        errors.push(`Invalid audio path for song ${entry.id}: ${entry.src}`);
      } else if (!fs.existsSync(audioPath)) {
        errors.push(`Missing local audio asset for song ${entry.id}: ${entry.src}`);
      }
    }
  }

  if (!entry.cover) {
    errors.push(`Song ${entry.id} has no cover`);
  } else {
    const coverPath = resolvePublicAsset(entry.cover);
    if (!coverPath) {
      errors.push(`Invalid cover path for song ${entry.id}: ${entry.cover}`);
    } else if (!fs.existsSync(coverPath)) {
      errors.push(`Missing cover asset for song ${entry.id}: ${entry.cover}`);
    }
  }

  if (entry.lrc) {
    const lyricPath = resolvePublicAsset(entry.lrc);
    if (!lyricPath) {
      errors.push(`Invalid lyric path for song ${entry.id}: ${entry.lrc}`);
    } else if (!fs.existsSync(lyricPath)) {
      errors.push(`Missing lyric asset for song ${entry.id}: ${entry.lrc}`);
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
  console.log(`Catalog metadata valid: ${entries.length} songs, ${sources.size} unique audio references`);
  console.log("Cover and lyric assets validated in public/.");
  if (checkLocalAudio) {
    console.log("Local audio check: enabled.");
  } else {
    console.log("Local audio check: skipped (audio is expected in Supabase Storage for this checkout).");
    console.log("To require local MP3 files, run: npm run validate:catalog -- --require-local-audio");
  }
}

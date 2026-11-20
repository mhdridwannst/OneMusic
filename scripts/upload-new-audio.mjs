import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const musicPath = path.join(root, "public", "music");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kyplrfucmziaykgnicpf.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = process.env.SUPABASE_AUDIO_BUCKET || "music";

if (!serviceRoleKey) {
  console.error("==================================================================");
  console.error("ERROR: SUPABASE_SERVICE_ROLE_KEY is required to upload to Supabase.");
  console.error("Run this script with:");
  console.error("  SUPABASE_SERVICE_ROLE_KEY=your_secret_key node scripts/upload-new-audio.mjs");
  console.error("Or add SUPABASE_SERVICE_ROLE_KEY=your_secret_key to .env.local");
  console.error("==================================================================");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const newAudioFiles = [
  "laufey-magnolia.mp3",
  "melanie-martinez-play-date-slowed.mp3",
  "ckay-love-nwantiti-slowed.mp3",
  "fujii-kaze-shinunoga-e-wa.mp3",
  "sapientdream-pastlives.mp3",
  "yung-kai-blue.mp3",
  "lana-del-rey-say-yes-to-heaven.mp3",
  "arijit-singh-channa-mereya.mp3",
  "arijit-singh-channa-mereya-slowed-lofi.mp3",
];

console.log(`Starting upload of ${newAudioFiles.length} new songs to bucket "${bucket}"...`);

for (const filename of newAudioFiles) {
  const filePath = path.join(musicPath, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}, skipping.`);
    continue;
  }

  const fileBuffer = fs.readFileSync(filePath);
  console.log(`Uploading ${filename} (${(fileBuffer.length / (1024 * 1024)).toFixed(2)} MB)...`);

  const { error } = await supabase.storage.from(bucket).upload(filename, fileBuffer, {
    contentType: "audio/mpeg",
    cacheControl: "31536000",
    upsert: true,
  });

  if (error) {
    console.error(`Failed to upload ${filename}:`, error.message);
  } else {
    console.log(`✓ Uploaded ${filename}`);
  }
}

console.log("All done!");

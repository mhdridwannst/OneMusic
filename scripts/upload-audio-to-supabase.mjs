import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const musicPath = path.join(root, "public", "music");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = process.env.SUPABASE_AUDIO_BUCKET || "music";

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before uploading.",
  );
  process.exit(1);
}

if (!fs.existsSync(musicPath)) {
  console.error(`Audio directory not found: ${musicPath}`);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const files = fs
  .readdirSync(musicPath, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".mp3"))
  .map((entry) => entry.name);

for (const filename of files) {
  const file = fs.readFileSync(path.join(musicPath, filename));
  const { error } = await supabase.storage.from(bucket).upload(filename, file, {
    contentType: "audio/mpeg",
    cacheControl: "31536000",
    upsert: true,
  });

  if (error) {
    console.error(`Failed to upload ${filename}: ${error.message}`);
    process.exit(1);
  }

  console.log(`Uploaded ${filename}`);
}

console.log(`Uploaded ${files.length} MP3 file(s) to bucket "${bucket}".`);

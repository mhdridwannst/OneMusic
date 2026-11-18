const AUDIO_BASE_URL = process.env.NEXT_PUBLIC_AUDIO_BASE_URL?.replace(/\/+$/, "");

export function resolveAudioSrc(src: string): string {
  const normalizedSrc = src.trim();
  if (!normalizedSrc) return "";

  // Supabase public URLs and other complete URLs must never be rewritten.
  if (/^https?:\/\//i.test(normalizedSrc)) {
    return normalizedSrc;
  }

  // Keep the local development path when no remote Storage base URL is set.
  if (!AUDIO_BASE_URL) {
    return normalizedSrc.startsWith("/") ? normalizedSrc : `/${normalizedSrc}`;
  }

  // The uploader stores files at the root of the Storage bucket.
  const pathWithoutQuery = normalizedSrc.split(/[?#]/, 1)[0];
  const filename = pathWithoutQuery.split("/").pop();
  if (!filename) return normalizedSrc;

  let decodedFilename = filename;
  try {
    decodedFilename = decodeURIComponent(filename);
  } catch {
    // Keep the original segment if it is not valid percent-encoding.
  }

  return `${AUDIO_BASE_URL}/${encodeURIComponent(decodedFilename)}`;
}

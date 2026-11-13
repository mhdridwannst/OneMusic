const AUDIO_BASE_URL = process.env.NEXT_PUBLIC_AUDIO_BASE_URL?.replace(/\/+$/, "");

export function resolveAudioSrc(src: string): string {
  if (!AUDIO_BASE_URL || /^https?:\/\//i.test(src)) {
    return src;
  }

  const filename = src.split("/").pop();
  if (!filename) return src;

  return `${AUDIO_BASE_URL}/${encodeURIComponent(filename)}`;
}

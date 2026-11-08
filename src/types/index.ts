export interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  src: string;
  lrc?: string;
  genre?: string;
  album?: string;
}

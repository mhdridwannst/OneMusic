import React from "react";
import { Song } from "@/types";
import AlbumCard from "@/components/AlbumCard";

interface SongListProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  likedSongs: number[];
  onPlay: (song: Song) => void;
  onToggleLike: (song: Song) => void;
  playlistSongIds: number[];
  onTogglePlaylist: (song: Song) => void;
}

export default function SongList({
  songs,
  currentSong,
  isPlaying,
  likedSongs,
  onPlay,
  onToggleLike,
  playlistSongIds,
  onTogglePlaylist,
}: SongListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 md:gap-4">
      {songs.map((song) => (
        <AlbumCard
          key={song.id}
          data={song}
          isCurrentSong={currentSong?.id === song.id}
          isPlaying={isPlaying}
          isLiked={likedSongs.includes(song.id)}
          onPlay={() => onPlay(song)}
          onToggleLike={(e) => {
            e.stopPropagation();
            onToggleLike(song);
          }}
          isInPlaylist={playlistSongIds.includes(song.id)}
          onTogglePlaylist={(e) => {
            e.stopPropagation();
            onTogglePlaylist(song);
          }}
        />
      ))}
    </div>
  );
}

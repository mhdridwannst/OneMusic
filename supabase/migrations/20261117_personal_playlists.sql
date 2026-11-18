-- OneMusic Personal Playlist schema
-- Run this once in Supabase Dashboard > SQL Editor.
-- Song IDs intentionally do not reference public.songs because the app's
-- catalogue can also contain entries from src/data/defaultSongs.ts.

create table if not exists public.playlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 60),
  description text not null default '' check (char_length(description) <= 240),
  cover_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.playlist_songs (
  id uuid primary key default gen_random_uuid(),
  playlist_id uuid not null references public.playlists (id) on delete cascade,
  song_id bigint not null,
  position integer not null default 0 check (position >= 0),
  added_at timestamptz not null default now(),
  constraint playlist_songs_playlist_song_unique unique (playlist_id, song_id)
);

create index if not exists playlists_user_updated_idx
  on public.playlists (user_id, updated_at desc);

create index if not exists playlist_songs_playlist_position_idx
  on public.playlist_songs (playlist_id, position asc);

alter table public.playlists enable row level security;
alter table public.playlist_songs enable row level security;

grant select, insert, update, delete on public.playlists to authenticated;
grant select, insert, update, delete on public.playlist_songs to authenticated;

drop policy if exists "Users can read their own playlists" on public.playlists;
create policy "Users can read their own playlists"
  on public.playlists for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can create their own playlists" on public.playlists;
create policy "Users can create their own playlists"
  on public.playlists for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own playlists" on public.playlists;
create policy "Users can update their own playlists"
  on public.playlists for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own playlists" on public.playlists;
create policy "Users can delete their own playlists"
  on public.playlists for delete
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can read songs in their own playlists" on public.playlist_songs;
create policy "Users can read songs in their own playlists"
  on public.playlist_songs for select
  to authenticated
  using (
    exists (
      select 1
      from public.playlists p
      where p.id = playlist_id
        and p.user_id = auth.uid()
    )
  );

drop policy if exists "Users can add songs to their own playlists" on public.playlist_songs;
create policy "Users can add songs to their own playlists"
  on public.playlist_songs for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.playlists p
      where p.id = playlist_id
        and p.user_id = auth.uid()
    )
  );

drop policy if exists "Users can reorder songs in their own playlists" on public.playlist_songs;
create policy "Users can reorder songs in their own playlists"
  on public.playlist_songs for update
  to authenticated
  using (
    exists (
      select 1
      from public.playlists p
      where p.id = playlist_id
        and p.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.playlists p
      where p.id = playlist_id
        and p.user_id = auth.uid()
    )
  );

drop policy if exists "Users can remove songs from their own playlists" on public.playlist_songs;
create policy "Users can remove songs from their own playlists"
  on public.playlist_songs for delete
  to authenticated
  using (
    exists (
      select 1
      from public.playlists p
      where p.id = playlist_id
        and p.user_id = auth.uid()
    )
  );

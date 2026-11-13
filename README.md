<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:09090b,100:22c527&height=190&section=header&text=OneMusic&fontSize=58&fontColor=ffffff&fontAlignY=40" width="100%" alt="OneMusic" />

# One<span style="color:#22c527">Music</span>

**Pemutar musik web pribadi dengan pengalaman audio yang imersif, cepat, dan nyaman di semua perangkat.**

<p>
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<a href="https://next-app-music.vercel.app/">Live Demo</a> ·
<a href="https://github.com/mhdridwannst/OneMusic/issues">Laporkan Bug</a>

</div>

<br />

<div align="center">
  <img src="https://github.com/user-attachments/assets/77602984-1120-4518-9c81-1065b60bd560" alt="Tampilan desktop OneMusic" width="100%" />
</div>

## Tentang OneMusic

OneMusic adalah aplikasi musik personal yang dibangun dengan Next.js dan
TypeScript. Fokusnya adalah pengalaman mendengarkan yang terasa premium:
antarmuka gelap bergaya glassmorphism, kontrol pemutaran yang responsif,
queue yang persisten, playlist personal, lirik tersinkronisasi, dan dukungan
PWA untuk perangkat mobile.

<div align="center">
  <img src="https://github.com/user-attachments/assets/b40c1e6a-db0c-4970-a64e-fdca3af71bf5" alt="Tampilan mobile OneMusic" width="300" />
</div>

## Fitur utama

- Katalog lokal-first dengan sinkronisasi Supabase dan fallback yang tangguh.
- Play, pause, next, previous, shuffle, repeat, seek, volume, dan playback rate.
- Queue prioritas dengan tambah, hapus, ubah urutan, persistence, dan autoplay.
- Playlist pribadi, favorit, recently played, dan rekomendasi lagu.
- Pencarian berdasarkan judul, artis, atau genre.
- Lirik `.lrc` dengan highlight dan scroll otomatis mengikuti lagu.
- Deep link lagu melalui `?song=<id>` dan tombol share.
- Full Player, Mini Player, shortcut keyboard, dan state error audio dengan retry.
- UI responsive untuk desktop, tablet, dan mobile.
- PWA, metadata Open Graph, tema gelap, reduced motion, dan focus state.

## Arsitektur deployment

```text
GitHub          → source code, cover, lirik, dan konfigurasi
Supabase        → database katalog dan Storage untuk file MP3
Vercel          → build dan hosting aplikasi Next.js
Browser user    → mengambil audio dari Supabase Storage
```

File MP3 sengaja tidak disimpan di GitHub. Folder `public/music/` diabaikan
oleh Git agar repository tetap ringan. Saat development lokal, aplikasi membaca
MP3 dari folder tersebut. Saat deployment, audio diarahkan ke URL Storage
melalui `NEXT_PUBLIC_AUDIO_BASE_URL`.

## Tech stack

| Bagian | Teknologi |
| --- | --- |
| Framework | Next.js 16 dengan App Router |
| UI | React 19, Tailwind CSS 4, Framer Motion |
| Bahasa | TypeScript |
| Data dan Storage | Supabase PostgreSQL dan Supabase Storage |
| Audio | HTMLAudioElement, Media Session API |
| PWA | Web App Manifest dan production service worker |
| Hosting | Vercel |

## Menjalankan secara lokal

### Prasyarat

- Node.js 18 atau lebih baru
- npm
- Project Supabase
- File MP3 personal di `public/music/`

### Instalasi

```bash
git clone https://github.com/mhdridwannst/OneMusic.git
cd OneMusic
npm install
```

### Environment variable

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=isi-dengan-publishable-key

# Opsional untuk deployment atau testing audio eksternal.
# Jangan tambahkan slash di akhir URL.
# NEXT_PUBLIC_AUDIO_BASE_URL=https://project-ref.supabase.co/storage/v1/object/public/music
```

`NEXT_PUBLIC_SUPABASE_ANON_KEY` aman digunakan oleh client sesuai policy
Supabase. Jangan pernah memasukkan Secret key atau service role key ke source
code, browser, GitHub, atau environment variable `NEXT_PUBLIC_*`.

### Menjalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Menyiapkan Supabase

### Tabel katalog

Jalankan di Supabase SQL Editor:

```sql
create table songs (
  id     bigint generated always as identity primary key,
  title  text not null,
  artist text not null,
  cover  text not null,
  src    text not null,
  lrc    text
);

alter table songs enable row level security;

create policy "Public read access"
  on songs for select
  using (true);
```

### Storage audio

1. Buka **Storage** di dashboard Supabase.
2. Buat bucket publik bernama `music`.
3. Pastikan ukuran setiap MP3 berada di bawah batas upload project.
4. Upload semua MP3 menggunakan script project.

Jalankan dari PowerShell:

```powershell
$env:NEXT_PUBLIC_SUPABASE_URL="https://project-ref.supabase.co"
$env:SUPABASE_SERVICE_ROLE_KEY="service-role-key-hanya-untuk-upload-lokal"
$env:SUPABASE_AUDIO_BUCKET="music"
npm run upload:audio
```

Script memakai `upsert`, sehingga menjalankan ulang upload tidak membuat file
duplikat. Service role key hanya dipakai sementara di terminal lokal dan tidak
boleh di-commit.

Setelah upload, URL audio publik memiliki pola:

```text
https://project-ref.supabase.co/storage/v1/object/public/music/nama-file.mp3
```

## Validasi sebelum commit atau deploy

```bash
npm run validate:catalog
npm run lint
npm run build
```

`validate:catalog` memeriksa ID lagu, duplikasi audio, serta keberadaan asset
audio dan cover. `npm run build` memastikan aplikasi dapat dikompilasi untuk
production.

## Deploy ke Vercel

1. Import repository ini ke Vercel.
2. Tambahkan environment variable berikut di **Settings → Environment Variables**:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=publishable-key
   NEXT_PUBLIC_AUDIO_BASE_URL=https://project-ref.supabase.co/storage/v1/object/public/music
   ```

3. Aktifkan variable untuk **Production** dan **Preview**.
4. Deploy atau redeploy project.
5. Tes pemutaran beberapa lagu dan cek URL audio pada browser Network panel.

Jangan tambahkan `SUPABASE_SERVICE_ROLE_KEY` ke Vercel. Key tersebut hanya
diperlukan untuk proses upload dari komputer lokal.

## Troubleshooting audio

### Lagu tidak dapat diputar setelah deploy

- Pastikan bucket `music` bersifat publik.
- Pastikan `NEXT_PUBLIC_AUDIO_BASE_URL` tidak memiliki slash di akhir.
- Pastikan nama object di Storage sama dengan nama file yang direferensikan.
- Pastikan environment variable diterapkan pada deployment yang benar.
- Redeploy setelah mengubah environment variable.

### Upload berhenti pada satu file

Periksa nama file. Gunakan nama ASCII sederhana seperti huruf, angka, `-`,
`_`, dan `.mp3`. Hindari emoji, tanda kurung siku, dan karakter Unicode
khusus pada nama object Storage.

Jalankan ulang:

```bash
npm run upload:audio
```

File yang sudah ada akan di-update karena uploader menggunakan `upsert: true`.

## Struktur penting

```text
src/
├── app/                  # App Router, layout, halaman, dan API
├── components/           # Komponen player dan UI
├── data/defaultSongs.ts  # Registry katalog lokal
├── hooks/                # State audio player
├── lib/audio.ts          # Resolver URL audio lokal/eksternal
└── types/                # TypeScript types
public/
├── images/               # Cover dan artwork
├── lyrics/               # File lirik .lrc
└── music/                # Audio lokal, diabaikan oleh Git
scripts/
├── upload-audio-to-supabase.mjs
└── validate-catalog.mjs
```

## Status project

OneMusic saat ini berada pada tahap **personal production-ready**: fitur utama
player, katalog, playlist, queue, PWA, validasi asset, dan deployment audio
eksternal sudah tersedia. Pengembangan berikutnya dapat berfokus pada
automated UI testing, sinkronisasi akun, dan artwork yang lebih konsisten.

## Kontribusi dan feedback

Temukan bug atau punya ide? Silakan buat
[issue di GitHub](https://github.com/mhdridwannst/OneMusic/issues).

<div align="center">
  <br />
  Dibuat dengan fokus pada musik, kenyamanan, dan pengalaman personal.
</div>

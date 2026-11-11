<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:000000,100:1DB954&height=180&section=header&text=OneMusic&fontSize=56&fontColor=ffffff&fontAlignY=40" width="100%" alt="OneMusic"/>

**Web app Music.**
Desainnya terinspirasi Spotify, dibuat dengan Next.js dan Supabase.

<p>
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion">
</p>

[Coba demonya](https://next-app-music.vercel.app/) · [Laporkan bug](https://github.com/wannn-sion95/OneMusic/issues)

<br/>

<img src="https://github.com/user-attachments/assets/77602984-1120-4518-9c81-1065b60bd560" alt="OneMusic tampilan desktop" width="100%">

</div>

<br/>

## Tentang proyek

OneMusic saya buat untuk belajar membangun aplikasi streaming dari ujung ke ujung: data lagu di database, API sendiri, player dengan state yang cukup rumit, sampai animasi yang terasa halus. Bagian yang paling saya suka adalah lirik tersinkronisasi. Baris yang sedang dinyanyikan menyala, dan layar ikut bergulir ke sana tanpa disentuh.

Di mobile, player tampil layar penuh. Di desktop, ada sidebar dan area utama yang lebih lega.

<div align="center">
  <img src="https://github.com/user-attachments/assets/b40c1e6a-db0c-4970-a64e-fdca3af71bf5" alt="OneMusic tampilan mobile" width="300">
</div>

## Yang bisa dilakukan

- Memutar lagu dari Supabase lewat endpoint `GET /api/songs`
- Lirik sinkron dari file `.lrc`, dengan scroll otomatis ke baris aktif
- Play/pause, next/prev, shuffle, repeat, dan pengatur volume
- Transisi antara cover art dan tampilan lirik memakai Framer Motion
- Tema gelap bergaya glassmorphism
- Layout adaptif untuk desktop dan mobile

## Cara kerja lirik

File `.lrc` adalah teks biasa, setiap barisnya diberi penanda waktu:

```
[00:12.50] Baris pertama lirik
[00:17.80] Baris kedua lirik
```

Saat lagu diputar, player membandingkan waktu putar saat ini dengan penanda waktu tiap baris. Baris terakhir yang waktunya sudah lewat dianggap aktif, lalu layar digulung ke baris itu.

## Tech stack

| Bagian | Teknologi |
| --- | --- |
| Framework | Next.js 16, React 19 |
| Bahasa | TypeScript |
| Database | Supabase (PostgreSQL) |
| Styling | Tailwind CSS 4 |
| Animasi | Framer Motion |
| Hosting | Vercel |

## Menjalankan di komputer sendiri

Kamu butuh Node.js 18 ke atas dan satu project [Supabase](https://supabase.com/) (paket gratis cukup).

**1. Clone dan install dependensi**

```bash
git clone https://github.com/wannn-sion95/OneMusic.git
cd OneMusic
npm install
```

**2. Siapkan tabel di Supabase**

Buka SQL Editor di dashboard Supabase, lalu jalankan:

```sql
create table songs (
  id     bigint generated always as identity primary key,
  title  text not null,
  artist text not null,
  cover  text not null,  -- URL gambar cover
  src    text not null,  -- URL file audio
  lrc    text            -- URL file .lrc, boleh kosong
);

alter table songs enable row level security;

create policy "Public read access"
  on songs for select
  using (true);
```

Policy di atas hanya mengizinkan baca. Karena itu anon key aman dipakai di sisi klien: siapa pun yang memegangnya tetap tidak bisa mengubah atau menghapus data.

Repo ini tidak membawa file lagu. Isi tabel `songs` dengan lagu milikmu sendiri, dan pastikan kamu punya hak untuk memakainya. Kolom `src` dan `lrc` cukup berisi URL, misalnya dari Supabase Storage.

**3. Atur environment variable**

Buat file `.env.local` di root proyek:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=isi-dengan-anon-key
```

Nilainya ada di dashboard Supabase, menu **Project Settings → API**.

**4. Jalankan**

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Deploy

Hubungkan repo ke Vercel, lalu isi dua environment variable di atas lewat **Settings → Environment Variables**. Setelah itu setiap push ke branch utama akan otomatis di-deploy.

## Kontribusi

Menemukan bug atau punya ide? Buka [issue](https://github.com/wannn-sion95/OneMusic/issues). Pull request juga boleh, tapi kabari lewat issue dulu supaya tidak tabrakan.

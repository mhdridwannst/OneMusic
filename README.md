<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:000000,100:1DB954&height=200&section=header&text=OneMusic&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=Your%20Ultimate%20Music%20Streaming%20Experience&descAlignY=62&descSize=20&descColor=1DB954" width="100%" alt="OneMusic Banner"/>

Pemutar musik web bergaya Spotify, dibangun dengan Next.js, Supabase, dan Framer Motion.

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-1DB954?style=flat-square" alt="License">
</p>

[Demo](https://next-app-music.vercel.app/) · [Laporkan Issue](https://github.com/wannn-sion95/OneMusic/issues)

</div>

---

OneMusic adalah aplikasi pemutar musik berbasis web dengan tampilan modern dan responsif. Lirik tersinkronisasi otomatis, antarmuka bergaya glassmorphism, dan transisi animasi yang halus.

<div align="center">
  <img src="https://github.com/user-attachments/assets/77602984-1120-4518-9c81-1065b60bd560" alt="OneMusic Desktop View" width="100%">
  <br/><br/>
  <img src="https://github.com/user-attachments/assets/b40c1e6a-db0c-4970-a64e-fdca3af71bf5" alt="OneMusic Mobile View" width="320">
</div>

## Fitur

- **Cloud streaming:** data lagu dan audio dikelola lewat Supabase (PostgreSQL).
- **Lirik tersinkronisasi:** mendukung format `.lrc`, baris aktif ditandai dan layar bergulir otomatis.
- **UI glassmorphism:** tema gelap yang bersih, dibuat dengan Tailwind CSS.
- **Animasi:** transisi mulus antara cover art dan tampilan lirik dengan Framer Motion.
- **Kontrol pemutaran:** play/pause, next/prev, shuffle, repeat, dan volume.
- **Layout adaptif:** sidebar di desktop, player layar penuh di mobile.

## Tech Stack

Next.js 16 · TypeScript · Supabase · Tailwind CSS · Framer Motion · Vercel

## Menjalankan Secara Lokal

Butuh Node.js v18+ dan npm, yarn, atau pnpm.

```bash
git clone https://github.com/wannn-sion95/OneMusic.git
cd OneMusic
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Lisensi

MIT

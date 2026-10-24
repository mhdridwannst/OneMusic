<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:000000,100:1DB954&height=200&section=header&text=OneMusic&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=Your%20Ultimate%20Music%20Streaming%20Experience&descAlignY=62&descSize=20&descColor=1DB954" width="100%" alt="OneMusic Banner"/>

**Pemutar musik web bergaya Spotify dengan lirik tersinkronisasi, UI glassmorphism, dan animasi yang halus.**

<p>
  <a href="https://github.com/wannn-sion95/OneMusic/stargazers"><img src="https://img.shields.io/github/stars/wannn-sion95/OneMusic?style=for-the-badge&color=1DB954&logo=github&logoColor=white" alt="Stars"></a>
  <a href="https://github.com/wannn-sion95/OneMusic/issues"><img src="https://img.shields.io/github/issues/wannn-sion95/OneMusic?style=for-the-badge&color=1DB954&logo=github&logoColor=white" alt="Issues"></a>
  <a href="#lisensi"><img src="https://img.shields.io/badge/License-MIT-1DB954?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="License"></a>
  <img src="https://img.shields.io/badge/Status-Active-1DB954?style=for-the-badge" alt="Status">
</p>

<p>
  <a href="https://next-app-music.vercel.app/"><b>🚀 Live Demo</b></a>
  &nbsp;•&nbsp;
  <a href="https://github.com/wannn-sion95/OneMusic/issues/new"><b>🐛 Laporkan Bug</b></a>
  &nbsp;•&nbsp;
  <a href="https://github.com/wannn-sion95/OneMusic/issues/new"><b>💡 Usulkan Fitur</b></a>
</p>

</div>

---

## 📖 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Tampilan Antarmuka](#-tampilan-antarmuka)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Memulai](#-memulai)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Deployment](#-deployment)
- [Kontribusi](#-kontribusi)
- [Lisensi](#lisensi)

---

## 🎧 Tentang Proyek

**OneMusic** adalah aplikasi pemutar musik berbasis web dengan tampilan modern dan responsif, terinspirasi dari pengalaman Spotify. Aplikasi ini menyajikan lirik yang bergerak otomatis mengikuti lagu, antarmuka *glassmorphism* bertema gelap, serta transisi animasi yang mulus di setiap interaksi.

---

## 🖼️ Tampilan Antarmuka

<div align="center">

### Desktop

<img src="https://github.com/user-attachments/assets/77602984-1120-4518-9c81-1065b60bd560" alt="OneMusic Desktop View" width="100%">

<br/>

### Mobile

<img src="https://github.com/user-attachments/assets/b40c1e6a-db0c-4970-a64e-fdca3af71bf5" alt="OneMusic Mobile View" width="320">

</div>

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| ☁️ **Cloud Music Streaming** | Data lagu dan audio dikelola secara dinamis menggunakan Supabase (PostgreSQL). |
| 🎤 **Synchronized Lyrics** | Dukungan lirik `.lrc` dengan penanda baris aktif dan auto-scroll mengikuti waktu lagu. |
| 🪟 **Glassmorphism UI** | Antarmuka *dark mode* yang bersih dan modern, dibangun dengan Tailwind CSS. |
| 🎞️ **Fluid Animations** | Transisi halus antara *cover art* dan tampilan lirik menggunakan Framer Motion. |
| 🎛️ **Playback Controls** | Play/Pause, Next/Prev, Shuffle, Repeat, dan Volume Control. |
| 📱 **Adaptive Layout** | Tata letak *sidebar* untuk Desktop dan *full-screen player* untuk Mobile. |

---

## 🛠️ Tech Stack

<div align="center">

<img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">

</div>

---

## 🚀 Memulai

### Prasyarat

Pastikan perangkat Anda sudah memiliki:

- [Node.js](https://nodejs.org/) v18 atau lebih baru
- npm, yarn, atau pnpm
- Akun [Supabase](https://supabase.com/) beserta project yang sudah dibuat

### Instalasi

1. **Clone repository**

   ```bash
   git clone https://github.com/wannn-sion95/OneMusic.git
   cd OneMusic
   ```

2. **Install dependencies**

   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Siapkan environment variable** (lihat bagian [Konfigurasi Environment](#-konfigurasi-environment))

   ```bash
   cp .env.example .env.local
   ```

4. **Jalankan development server**

   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🔐 Konfigurasi Environment

Buat file `.env.local` di root proyek, lalu isi dengan kredensial Supabase Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Kredensial dapat ditemukan di dashboard Supabase pada menu **Project Settings → API**.

---

## 🌐 Deployment

Cara termudah untuk men-deploy OneMusic adalah melalui [Vercel](https://vercel.com/):

1. Push repository ke GitHub.
2. Import project di Vercel.
3. Tambahkan environment variable yang sama seperti di atas.
4. Klik **Deploy**.

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Jika Anda ingin membantu:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/fitur-baru`)
3. Commit perubahan Anda (`git commit -m "feat: tambah fitur baru"`)
4. Push ke branch (`git push origin feature/fitur-baru`)
5. Buka Pull Request

---

## Lisensi

Didistribusikan di bawah lisensi **MIT**. Lihat berkas `LICENSE` untuk informasi lebih lanjut.

---

<div align="center">

Dibuat dengan 💚 oleh [wannn-sion95](https://github.com/wannn-sion95)

⭐ Jika proyek ini bermanfaat, jangan lupa beri bintang!

</div>

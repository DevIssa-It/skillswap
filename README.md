# 🚀 SkillSwap — Monorepo (Platform Barter Skill #1 Antar Mahasiswa Indonesia)

> **Proyek Submission: 3-Hours Speedrun Build — IndonesiaNEXT Hackathon**

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_API-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📂 Struktur Monorepo (Project Structure)

```text
skillswap/
├── server/       <-- Backend REST API & Realtime Socket.io (Node.js, Express, Prisma/DB)
└── skillswap/    <-- Frontend Web Application (Next.js 16 App Router, React 19, Tailwind CSS v4)
```

---

## 📌 1. Latar Belakang & Masalah (Problem Statement)

Dalam dunia perkuliahan, mahasiswa sering kali dihadapkan pada kebutuhan keahlian spesifik lintas disiplin ilmu untuk menyelesaikan tugas kuliah, skripsi, maupun membangun proyek startup/portofolio:
- **Biaya Tinggi**: Menggunakan jasa profesional atau mengikuti kursus berbayar (misal: jasa joki statistik SPSS, freelance UI/UX designer, atau web developer) membutuhkan biaya mahal yang memberatkan kantong mahasiswa.
- **Potensi Terisolasi**: Di sisi lain, setiap mahasiswa sebenarnya memiliki keahlian unik (seperti kemampuan riset, penulisan ilmiah, video editing, atau ilustrasi) yang tidak termanfaatkan secara optimal.
- **Kurangnya Wadah Kolaborasi Lintas Kampus**: Tidak ada platform khusus yang memfasilitasi pertukaran keahlian secara adil, aman, dan transparan antar mahasiswa lintas perguruan tinggi di Indonesia.

---

## 💡 2. Solusi yang Ditawarkan (Solution)

**SkillSwap** hadir sebagai platform *peer-to-peer skill barter* berbasis web pertama yang memfasilitasi mahasiswa seluruh Indonesia untuk **saling menukarkan keahlian tanpa transaksi uang**.

- **Prinsip Bebas Biaya**: "Skill kamu berharga. Tukarkan, bukan jual."
- **Algoritma Matching Score Automatis**: Sistem cerdas yang menganalisis kecocokan kebutuhan dua mahasiswa secara real-time (misal: Mahasiswa A bisa *UI Design* & butuh *React Dev*, Mahasiswa B bisa *React Dev* & butuh *UI Design* -> Match 95%!).
- **Verifikasi Komunitas Kampus**: Ekosistem aman yang berbasis identitas kampus mahasiswa.

---

## 🎯 3. Target Market / Audiens (Target Pengguna)

1. **Pengguna Utama (Primary Users)**:
   - Mahasiswa aktif S1/D3/D4 dari seluruh Perguruan Tinggi Negeri & Swasta di Indonesia (UI, ITB, UGM, UNPAD, BINUS, UNAIR, ITS, UNDIP, UNHAS, UB, dll).
2. **Pengguna Khusus (Secondary Users)**:
   - **Mahasiswa Tingkat Akhir**: Yang membutuhkan bantuan analisis data statistik, translate jurnal, atau desain layout skripsi.
   - **Student Founders / Freelancers**: Yang sedang membangun MVP startup atau portofolio awal dan membutuhkan *collaborator* lintas keahlian (Dev + Designer + Marketer).

---

## ✨ 4. Fitur-Fitur Utama (Key Features)

- 🎨 **Kategori Skill Lengkap**: Meliputi Design & UI/UX, Programming & Tech, Akademik & Riset, Video Editing, Content Writing, dan lainnya.
- 🔄 **Barter Request System**: Publikasi permintaan dan penawaran keahlian secara terstruktur.
- ⚡ **Real-Time Matching Score**: Indikator kecocokan otomatis untuk mempercepat proses menemukan partner barter.
- 🌟 **Success Stories & Rating System**: Transparansi reputasi dan ulasan riwayat kolaborasi mahasiswa.
- 💎 **Modern Premium Design System**: Tampilan visual dark-mode modern dengan glassmorphism, responsif penuh, dan mikro-animasi halus (*Framer Motion*).

---

## 🛠️ 5. Teknologi yang Digunakan (Tech Stack)

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express, Prisma ORM, Socket.io, JWT Authentication

---

## 🚀 6. Panduan Menjalankan Monorepo (Getting Started)

### Prasyarat
- Node.js versi 18.0.0 atau yang lebih baru
- npm / yarn / pnpm

### Langkah Instalasi

```bash
# 1. Clone Monorepo
git clone https://github.com/DevIssa-It/skillswap.git
cd skillswap

# 2. Jalankan Backend (Server)
cd server
npm install
npm run dev

# 3. Di Terminal terpisah, Jalankan Frontend (SkillSwap)
cd ../skillswap
npm install
npm run dev
```

---

## 📋 7. Detail Pengumpulan Tugas (Submission Info)

- **Nama Program**: IndonesiaNEXT Hackathon — 3-Hours Speedrun Build
- **Nama Peserta**: A. Issadurrofiq Jaya Utama
- **Asal Kampus**: Universitas Brawijaya
- **GitHub Repository (Monorepo)**: [https://github.com/DevIssa-It/skillswap.git](https://github.com/DevIssa-It/skillswap.git)
- **Live Staging URL**: [https://skillswap-ruby-pi.vercel.app](https://skillswap-ruby-pi.vercel.app)

---

## 🔐 8. Demo Akun (Test Credentials)

Gunakan akun berikut untuk mencoba platform secara langsung tanpa perlu mendaftar:

| Role | Email | Password |
|:---|:---|:---|
| User Demo 1 | `demo@skillswap.id` | `demo1234` |
| User Demo 2 | `barter@skillswap.id` | `demo1234` |

> Atau daftar akun baru gratis di [https://skillswap-ruby-pi.vercel.app/register](https://skillswap-ruby-pi.vercel.app/register)

---

## 🌐 9. Deployment Architecture

| Layer | Platform | URL |
|:---|:---|:---|
| **Frontend** | Vercel | [https://skillswap-ruby-pi.vercel.app](https://skillswap-ruby-pi.vercel.app) |
| **Backend API** | Railway | [https://skillswap-production-b7a0.up.railway.app](https://skillswap-production-b7a0.up.railway.app) |
| **Database** | PostgreSQL via Prisma (Railway) | — |

---
*Created with ❤️ for IndonesiaNEXT Hackathon 2026*

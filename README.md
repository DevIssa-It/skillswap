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

### Environment Variables

> ⚠️ Jangan pernah commit file `.env` ke GitHub. Gunakan `.env.example` sebagai template.

**Backend (`server/.env`)** — set di Railway Dashboard → Variables:

| Variable | Nilai |
|:---|:---|
| `DATABASE_URL` | PostgreSQL connection string dari Railway |
| `JWT_SECRET` | Random string panjang (min. 32 karakter) |
| `JWT_EXPIRES_IN` | `7d` |
| `PORT` | `3001` (Railway set otomatis) |
| `FRONTEND_URL` | `http://localhost:3000,https://skillswap-ruby-pi.vercel.app` |

**Frontend (`skillswap/.env.local`)** — set di Vercel Dashboard → Environment Variables:

| Variable | Nilai |
|:---|:---|
| `NEXT_PUBLIC_API_URL` | `https://skillswap-production-b7a0.up.railway.app` |

---

## 🔄 10. Vibe Coding Loop — Implementasi di Project Ini

Project ini dibangun mengikuti **The Vibe Coding Loop** yang diajarkan di kelas Hacker IndonesiaNEXT oleh Akhri F. Ramadhan (AI Builders). Berikut pemetaan setiap gerakan ke kode nyata:

### 01 FRAME — PRD sebagai Jangkar
Sebelum menulis satu baris kode pun, problem statement, target user, dan fitur utama didefinisikan terlebih dahulu (lihat bagian 1–4 README ini). Dokumen ini menjadi acuan tetap agar arah pengembangan tidak berubah di tengah jalan.

### 02 SCAFFOLD — Kerangka Arsitektur Modular
Arsitektur dipisah menjadi tiga concern yang independen:
```
Frontend  →  skillswap/  (Next.js, React, Tailwind)
API       →  server/src/modules/  (Express, modular per domain)
Database  →  server/prisma/  (Prisma ORM, PostgreSQL)
```
Setiap domain (auth, requests, matches, ratings, stats) punya folder `routes → controller → service` sendiri. Satu perubahan di satu modul tidak merusak modul lain.

### 03 INJECT — LLM sebagai Fungsi Inti (Matching Score)
Algoritma matching bukan sekadar fitur tambahan — ini adalah **inti produk**. Diimplementasikan di [`server/src/modules/requests/requests.service.ts`](server/src/modules/requests/requests.service.ts):
- +50 poin → mutual match langsung (A offer = B need, B offer = A need)
- +20 poin → kampus sama
- +15 poin → estimasi waktu kompatibel
- +15 poin → reputasi (swapScore dinormalisasi)

Hasil: skor 0–100 yang dihitung otomatis setiap ada request baru, lalu dikirim real-time via Socket.io.

### 04 VERIFY — Tes Koneksi Frontend ↔ API ↔ Database
Setiap endpoint diuji end-to-end sebelum dianggap selesai:
- Health check endpoint: `GET /api/health`
- Auth flow (register → login → JWT → protected route) diverifikasi manual
- Matching flow (post request → compute → create match → socket emit) diverifikasi di staging

### 05 HARDEN — Checklist Keamanan
| Checklist | Implementasi |
|:---|:---|
| Secret di `.env` | `JWT_SECRET`, `DATABASE_URL` tidak pernah di-hardcode |
| HTTP Security Headers | `helmet` aktif di semua response |
| CORS strict | Hanya origin yang terdaftar di `FRONTEND_URL` yang diizinkan |
| JWT Authentication | Semua endpoint sensitif dilindungi `authMiddleware` |
| Rate Limiting | Global: 100 req/15min · Auth: 10 req/15min (`express-rate-limit`) |
| Input Validation | DTO validation di setiap controller sebelum masuk service |
| Password Hashing | `bcryptjs` untuk semua password user |

### 06 SHIP — Deploy Sejak Awal, Sesering Mungkin
Deploy dilakukan sejak hari pertama, bukan di akhir:
- **Frontend** → Vercel (auto-deploy dari GitHub)
- **Backend** → Railway (auto-deploy dari GitHub)
- **Database** → PostgreSQL managed di Railway

Error yang muncul saat deploy langsung dijadikan bahan debug (AI Debugging Loop: Capture → Feed → Root → Verify).

---

## 🧠 11. Keresahan yang Dipecahkan (Fall in Love with the Problem)

> *"Fall in love with the problem, not the solution."*

Keresahan ini ditemukan dari **radius 3 meter** — lingkungan mahasiswa sendiri:
- Teman butuh jasa desain UI tapi tidak punya uang → bayar mahal ke freelancer
- Teman lain jago desain tapi butuh bantuan analisis data statistik
- Keduanya punya skill yang saling dibutuhkan, tapi tidak ada platform yang mempertemukan mereka secara adil

SkillSwap hadir bukan karena "kita bisa membuatnya", tapi karena **masalahnya nyata dan terasa setiap hari**.

---
*Created with ❤️ for IndonesiaNEXT Hackathon 2026*

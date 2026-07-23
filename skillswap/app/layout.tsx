import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillSwap — Barter Skill Antar Mahasiswa",
  description: "Platform barter skill terbaik untuk mahasiswa Indonesia. Tawarkan keahlianmu, dapatkan skill yang kamu butuhkan — tanpa biaya.",
  keywords: ["skillswap", "barter skill", "mahasiswa", "kolaborasi", "Indonesia"],
  openGraph: {
    title: "SkillSwap — Barter Skill Antar Mahasiswa",
    description: "Tawarkan keahlianmu, dapatkan skill yang kamu butuhkan — tanpa biaya.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden grid-bg pt-32 sm:pt-40 pb-20 sm:pb-24">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#f24d29]/15 blur-[160px] pointer-events-none rounded-full" />

      <motion.div
        className="relative z-10 section-container text-center flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="bg-[#120604]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 mb-6">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#f24d29]">
            Platform Barter Skill #1 Indonesia
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] text-white tracking-tight mb-6 max-w-5xl">
          Skill kamu berharga.<br />
          <span className="text-gradient">Tukarkan, bukan jual.</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Tawarkan keahlianmu, dapatkan skill yang kamu butuhkan secara gratis antar mahasiswa seluruh Indonesia.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link href="/register" className="btn-primary group text-xs sm:text-sm py-3.5 px-8 w-full sm:w-auto justify-center">
            Mulai Barter Sekarang
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/explore" className="btn-ghost text-xs sm:text-sm py-3.5 px-8 w-full sm:w-auto justify-center">
            Jelajahi Skill
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

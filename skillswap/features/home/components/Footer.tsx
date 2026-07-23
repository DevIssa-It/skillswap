'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Footer() {
  const [hovered, setHovered] = useState(false);

  return (
    <footer className="bg-[#691c10] border-t border-white/10 flex flex-col">
      {/* Big text area */}
      <div className="flex-1 flex items-center justify-center py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#691c10] via-[#963222] to-[#691c10] opacity-60" />
        <h2
          className="relative z-10 font-black leading-none tracking-tighter text-center px-4 transition-colors duration-500 cursor-default select-none"
          style={{
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            color: hovered ? '#f24d29' : 'white',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          START<br />SWAPPING.
        </h2>
      </div>

      {/* CTA */}
      <div className="flex justify-center pb-14">
        <Link href="/register" className="btn-primary text-sm px-10 py-4 group">
          Bergabung Gratis Sekarang
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black text-white/80">
            SKILL<span className="text-[#f24d29]">SWAP</span>
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/50 font-semibold uppercase tracking-widest">
            <a href="#cara-kerja" className="hover:text-[#f24d29] transition-colors">Cara Kerja</a>
            <a href="#kategori" className="hover:text-[#f24d29] transition-colors">Kategori</a>
            <a href="#testimoni" className="hover:text-[#f24d29] transition-colors">Testimoni</a>
          </div>
          <span className="text-xs text-white/30">© 2025 SkillSwap Indonesia.</span>
        </div>
      </div>
    </footer>
  );
}

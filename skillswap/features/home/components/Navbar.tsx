'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Platform', href: '#platform' },
    { label: 'Cara Kerja', href: '#cara-kerja' },
    { label: 'Kategori', href: '#kategori' },
    { label: 'Testimoni', href: '#testimoni' },
  ];

  return (
    <>
      <nav
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-7xl rounded-full px-6 py-4 flex items-center justify-between transition-all duration-300 border ${
          scrolled
            ? 'bg-[#080302]/90 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/80'
            : 'bg-black/30 backdrop-blur-md border-white/10'
        }`}
      >
        {/* Brand Logo (mr-auto pushes links & mobile button to right) */}
        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter flex items-center gap-0.5 mr-auto">
          <span className="text-white font-black">SKILL</span>
          <span className="text-white/70 font-black">SWAP</span>
        </Link>

        {/* Desktop Links (mr-8 sits directly to left of CTA / icon) */}
        <div className="hidden lg:flex items-center gap-8 mr-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-[#f24d29] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-xs py-2.5 px-5">
            Masuk
          </Link>
          <Link href="/register" className="btn-primary text-xs py-2.5 px-5">
            Mulai Gratis
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden text-white p-2 cursor-pointer"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#691c10] flex flex-col justify-between p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter flex items-center gap-0.5" onClick={() => setMenuOpen(false)}>
              <span className="text-white">SKILL</span>
              <span className="text-[#f24d29]">SWAP</span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white cursor-pointer"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-4xl md:text-6xl font-black text-white/80 hover:text-[#f24d29] transition-all transform origin-left"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
            <Link href="/login" className="btn-ghost justify-center text-center" onClick={() => setMenuOpen(false)}>
              Masuk
            </Link>
            <Link href="/register" className="btn-primary justify-center text-center" onClick={() => setMenuOpen(false)}>
              Mulai Gratis
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

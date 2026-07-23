'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Palette, Code2, BookOpen } from 'lucide-react';

const CATEGORIES = [
  {
    icon: Palette,
    title: 'Design & UI/UX',
    desc: 'Figma, Design System, Wireframing, User Research',
    count: '240+ Swapper',
  },
  {
    icon: Code2,
    title: 'Programming & Tech',
    desc: 'Web Dev, React, Next.js, Python, AI/ML',
    count: '380+ Swapper',
  },
  {
    icon: BookOpen,
    title: 'Akademik & Riset',
    desc: 'Statistik, SPSS, Jurnal, Penulisan Skripsi',
    count: '190+ Swapper',
  },
];

export function SkillCategoriesSection() {
  return (
    <section id="kategori" className="py-16 sm:py-24 bg-[#080302]">
      <div className="section-container space-y-10 sm:space-y-12">
        {/* Header */}
        <motion.div
          className="max-w-2xl mb-12 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[#f24d29] mb-3 block">
            Kategori Skill
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-white mb-4 tracking-tight">
            Semua Keahlian,<br />Satu Platform.
          </h2>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
            Dari desain hingga coding, dari riset hingga konten — temukan partner barter yang tepat untuk kebutuhan skripsi atau projekmu.
          </p>
          <Link href="/explore" className="btn-primary group inline-flex text-xs sm:text-sm">
            Lihat Semua Kategori
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                className="glass rounded-2xl p-7 sm:p-8 flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#f24d29]/10 border border-[#f24d29]/30 flex items-center justify-center text-[#f24d29]">
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#f24d29] bg-[#f24d29]/10 px-3 py-1.5 rounded-full border border-[#f24d29]/20">
                    {cat.count}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{cat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

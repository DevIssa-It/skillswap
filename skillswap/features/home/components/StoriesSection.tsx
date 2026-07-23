'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const STORIES = [
  {
    name: 'Reza & Dian',
    campus: 'UI × ITB',
    swap: 'UI Design ↔ React Dev',
    img: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/EcoNexa_w4kl4w.webp',
    quote: 'Dalam 2 hari project landing page kami selesai. Tanpa bayar, cuma saling tukar skill!',
  },
  {
    name: 'Aisyah & Bimo',
    campus: 'UNPAD × UGM',
    swap: 'Statistik ↔ Copywriting',
    img: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/Calm_Hero_fbj3b9.webp',
    quote: 'Skripsi saya terbantu banget sama Bimo, dan dia juga dapat copy untuk pitch deck startup-nya.',
  },
  {
    name: 'Kevin & Sari',
    campus: 'BINUS × UNAIR',
    swap: 'Video Editing ↔ Social Media',
    img: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/Bali_travel_oxtsng.webp',
    quote: 'SkillSwap bikin kolaborasi antar kampus jadi semudah klik tombol match.',
  },
  {
    name: 'Fajar & Nindi',
    campus: 'ITS × UNDIP',
    swap: 'Backend Dev ↔ Ilustrasi',
    img: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/Northridge_Hero_lltty5.webp',
    quote: 'Match pertama saya langsung jalan. Algoritmanya tepat banget.',
  },
  {
    name: 'Tara & Hendra',
    campus: 'UNHAS × UB',
    swap: 'Desain Logo ↔ Presentasi',
    img: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/Naturally_Website_h5aq5g.webp',
    quote: 'Sekarang saya punya 5 koneksi skill swap aktif. Komunitas yang luar biasa!',
  },
];

export function StoriesSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimoni" className="py-16 sm:py-24 bg-[#080302]">
      <div className="section-container space-y-10 sm:space-y-12">
        <motion.div
          className="mb-12 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[#f24d29] mb-2 block">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Mereka sudah swap.<br /><span className="text-white/30">Giliranmu.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-3 h-[520px] md:h-[460px]">
          {STORIES.map((story, i) => {
            const isActive = active === i;
            return (
              <div
                key={story.name}
                className="relative overflow-hidden rounded-2xl cursor-pointer"
                style={{
                  flex: isActive ? 5 : 1,
                  transition: 'flex 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                  minWidth: 0,
                }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <img
                  src={story.img}
                  alt={story.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: isActive ? 0.7 : 0.2,
                    filter: isActive ? 'none' : 'blur(3px)',
                    transition: 'opacity 0.6s ease, filter 0.6s ease',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: isActive
                      ? 'linear-gradient(to top, rgba(8,3,2,0.95) 0%, rgba(8,3,2,0.3) 60%, transparent 100%)'
                      : 'rgba(8,3,2,0.75)',
                    transition: 'background 0.6s ease',
                  }}
                />
                <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-7">
                  {isActive ? (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f24d29] mb-1 block">{story.campus}</span>
                      <h3 className="text-xl sm:text-2xl font-black text-white mb-1">{story.name}</h3>
                      <p className="text-xs font-bold text-[#f24d29] mb-3">{story.swap}</p>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-sm">&quot;{story.quote}&quot;</p>
                    </motion.div>
                  ) : (
                    <span className="text-xs font-bold text-white/40 [writing-mode:vertical-rl] rotate-180 md:[writing-mode:horizontal-tb] md:rotate-0 truncate">
                      {story.name}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

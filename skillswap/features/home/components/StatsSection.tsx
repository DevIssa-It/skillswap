'use client';

import { motion } from 'framer-motion';

export function StatsSection() {
  const stats = [
    { value: '2,400+', label: 'Mahasiswa Aktif' },
    { value: '1,800+', label: 'Swap Berhasil' },
    { value: '50+', label: 'Kampus Terdaftar' },
    { value: '4.9/5', label: 'Rating Platform' },
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#160805] border-y border-[#f24d29]/20 shadow-[inset_0_0_50px_rgba(242,77,41,0.05)] relative z-10">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="text-3xl sm:text-5xl font-black text-gradient mb-2">{s.value}</div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/50">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

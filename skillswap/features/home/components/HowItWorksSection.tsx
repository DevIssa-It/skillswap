'use client';

import { motion } from 'framer-motion';
import { Users, RefreshCw, Zap, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Daftar & Pilih Skill',
    desc: 'Buat profil akun, isi asal kampus, dan tentukan keahlian yang kamu miliki.',
    icon: Users,
  },
  {
    num: '02',
    title: 'Post Swap Request',
    desc: 'Publikasikan request barter sederhana: "Aku bisa UI Design, butuh React Dev".',
    icon: RefreshCw,
  },
  {
    num: '03',
    title: 'Matching Score Otomatis',
    desc: 'Algoritma cerdas kami otomatis menghitung skor kecocokan 90%+ secara real-time.',
    icon: Zap,
  },
  {
    num: '04',
    title: 'Mulai Berkolaborasi',
    desc: 'Terima match, kontak diungkapkan, dan saling transfer pengetahuan tanpa uang.',
    icon: CheckCircle2,
  },
];

export function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-16 sm:py-24 bg-[#140806] border-y border-[#f24d29]/15 relative z-10">
      <div className="section-container space-y-10 sm:space-y-12">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#f24d29] mb-3 block">Cara Kerja</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Semudah 4 Langkah.</h2>
          <p className="text-white/50 text-base">
            Proses barter skill yang transparan, cepat, dan terverifikasi untuk semua mahasiswa.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                className="glass rounded-2xl p-7 sm:p-8"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-[#f24d29]">{s.num}</span>
                  <div className="w-10 h-10 rounded-xl bg-[#f24d29]/10 border border-[#f24d29]/30 flex items-center justify-center text-[#f24d29]">
                    <Icon size={20} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

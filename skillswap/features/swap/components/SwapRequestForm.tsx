'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Zap, Check } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { ToastList } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import { swapService } from '../services/swap.service';
import { ALL_SKILLS } from '@/constants/skills';
import { CATEGORIES, TIME_ESTIMATES } from '@/constants/categories';
import { CreateSwapRequestDto } from '@/types';

const EMPTY_FORM: CreateSwapRequestDto = {
  offerSkill: '', needSkill: '', description: '', category: '', timeEstimate: '1_day',
};

export function SwapRequestForm() {
  const router = useRouter();
  const { toasts, toast, dismiss } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CreateSwapRequestDto>(EMPTY_FORM);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.offerSkill || !form.needSkill || !form.category) {
      toast.error('Field wajib', 'Skill yang ditawarkan, dibukukan, dan kategori harus diisi');
      return;
    }
    setLoading(true);
    try {
      await swapService.create(form);
      toast.success('Request dibuat!', 'Sistem sedang mencari match terbaikmu...');
      setTimeout(() => router.push('/matches'), 1500);
    } catch {
      toast.error('Gagal', 'Tidak dapat membuat swap request. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid-bg">
      <AppHeader backHref="/dashboard" title="Buat Request" />

      <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 py-10 relative z-10">
        <div className="w-full max-w-[540px] relative z-10">
          <div className="mb-8 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Zap size={20} className="text-[#1D6FFF]" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Buat Swap Request</h1>
            </div>
            <p className="text-white/50 text-sm">Sistem kami akan otomatis mencocokkan request-mu secara real-time.</p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Offer Skill */}
            <div>
              <label htmlFor="offer" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2 block">
                Skill yang kamu tawarkan *
              </label>
              <select
                id="offer"
                className="input cursor-pointer"
                value={form.offerSkill}
                onChange={e => setForm(f => ({ ...f, offerSkill: e.target.value }))}
              >
                <option value="" className="bg-[#080D1C] text-white/50">Pilih skill yang kamu kuasai...</option>
                {ALL_SKILLS.map(s => (
                  <option key={s} value={s} className="bg-[#080D1C] text-white">{s}</option>
                ))}
              </select>
            </div>

            {/* Need Skill */}
            <div>
              <label htmlFor="need" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2 block">
                Skill yang kamu butuhkan *
              </label>
              <select
                id="need"
                className="input cursor-pointer"
                value={form.needSkill}
                onChange={e => setForm(f => ({ ...f, needSkill: e.target.value }))}
              >
                <option value="" className="bg-[#080D1C] text-white/50">Pilih skill yang ingin kamu dapatkan...</option>
                {ALL_SKILLS.filter(s => s !== form.offerSkill).map(s => (
                  <option key={s} value={s} className="bg-[#080D1C] text-white">{s}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3 block">
                Kategori *
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, category: cat }))}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      form.category === cat
                        ? 'bg-[#1D6FFF] text-white shadow-lg shadow-[#1D6FFF]/30'
                        : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Estimate */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3 block">
                Estimasi Waktu Barter
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TIME_ESTIMATES.map(t => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, timeEstimate: t.value }))}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      form.timeEstimate === t.value
                        ? 'bg-[#1D6FFF] text-white shadow-lg shadow-[#1D6FFF]/30'
                        : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="desc" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2 block">
                Deskripsi Tambahan (opsional)
              </label>
              <textarea
                id="desc"
                className="input resize-none"
                rows={3}
                placeholder="Jelaskan kebutuhan projek atau target barter skill..."
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
            </div>

            {/* Live Preview */}
            {form.offerSkill && form.needSkill && (
              <div className="rounded-2xl p-4 border border-blue-500/30 bg-blue-500/10">
                <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold uppercase tracking-widest text-[#1D6FFF]">
                  <Check size={14} /> Preview Barter
                </div>
                <p className="text-white font-bold text-sm sm:text-base">
                  Aku bisa <span className="text-[#60A5FA]">{form.offerSkill}</span>
                  , butuh <span className="text-[#60A5FA]">{form.needSkill}</span>
                </p>
              </div>
            )}

            <button type="submit" className="btn-primary w-full justify-center group py-3.5 mt-2" disabled={loading}>
              {loading ? 'Mencari Match...' : 'Publikasikan Request'}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>
      </div>

      <ToastList toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}

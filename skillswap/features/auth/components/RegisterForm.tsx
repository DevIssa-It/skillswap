'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, User, Building, Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ALL_SKILLS } from '@/constants/skills';
import { CAMPUSES } from '@/constants/categories';

export function RegisterForm() {
  const { register, loading, error } = useAuth();
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [localError, setLocalError] = useState('');
  const [form, setForm] = useState({ name: '', campus: '', email: '', password: '', skills: [] as string[] });

  const toggleSkill = (skill: string) => {
    setForm(f => ({
      ...f,
      skills: f.skills.includes(skill) ? f.skills.filter(s => s !== skill) : [...f.skills, skill],
    }));
  };

  const validateStep1 = () => {
    if (!form.name || !form.campus || !form.email || !form.password) {
      setLocalError('Semua field bertanda * wajib diisi');
      return false;
    }
    if (form.password.length < 8) {
      setLocalError('Password minimal 8 karakter');
      return false;
    }
    setLocalError('');
    return true;
  };

  const handleSubmit = () => {
    if (form.skills.length === 0) {
      setLocalError('Pilih minimal 1 skill yang kamu miliki');
      return;
    }
    setLocalError('');
    register(form);
  };

  return (
    <div className="min-h-screen grid-bg flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 py-12 relative z-10">
      <div className="w-full max-w-[500px] relative z-10">
        <div className="mb-6 text-center sm:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-[#1D6FFF] transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Kembali
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Buat Akun Baru</h1>
          <p className="text-white/50 text-sm">Mulai swap skill hari ini — gratis selamanya.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-6 bg-[#080D1C]/80 border border-white/10 rounded-xl p-3">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-3 flex-1">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                  step >= s ? 'bg-[#1D6FFF] text-white shadow-lg shadow-[#1D6FFF]/30' : 'bg-white/10 text-white/40'
                }`}
              >
                {step > s ? <Check size={14} /> : s}
              </div>
              <span className={`text-xs font-bold ${step >= s ? 'text-white' : 'text-white/40'}`}>
                {s === 1 ? 'Data Diri' : 'Pilih Skill'}
              </span>
              {s < 2 && <div className={`h-px flex-1 transition-all ${step > s ? 'bg-[#1D6FFF]' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1.5 block">
                  Nama Lengkap *
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    className="input pl-11"
                    placeholder="Contoh: Ahmad Durrofiq"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="campus" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1.5 block">
                  Asal Kampus *
                </label>
                <div className="relative">
                  <select
                    id="campus"
                    className="input pl-11 appearance-none cursor-pointer"
                    value={form.campus}
                    onChange={e => setForm(f => ({ ...f, campus: e.target.value }))}
                  >
                    <option value="" className="bg-[#080D1C] text-white/50">Pilih kampus...</option>
                    {CAMPUSES.map(c => (
                      <option key={c} value={c} className="bg-[#080D1C] text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                  <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="reg-email" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1.5 block">
                  Email *
                </label>
                <div className="relative">
                  <input
                    id="reg-email"
                    type="email"
                    className="input pl-11"
                    placeholder="kamu@kampus.ac.id"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="reg-password" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1.5 block">
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="reg-password"
                    type={showPass ? 'text' : 'password'}
                    className="input pl-11 pr-12"
                    placeholder="Minimal 8 karakter"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  />
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                    aria-label="Toggle password"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {localError && (
                <div className="text-red-400 text-xs font-semibold bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  {localError}
                </div>
              )}

              <button
                className="btn-primary w-full justify-center group py-3.5 mt-2"
                onClick={() => validateStep1() && setStep(2)}
              >
                Lanjut ke Pilih Skill <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-4">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-1">
                  Pilih Skill Yang Kamu Miliki *
                </label>
                <p className="text-xs text-white/40">
                  Pilih keahlian yang bisa kamu tawarkan ({form.skills.length} dipilih)
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6 max-h-64 overflow-y-auto pr-1 p-3 bg-[#03050F]/50 rounded-xl border border-white/10">
                {ALL_SKILLS.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`skill-badge ${form.skills.includes(skill) ? 'selected' : ''}`}
                  >
                    {form.skills.includes(skill) && <Check size={12} className="mr-1" />}
                    {skill}
                  </button>
                ))}
              </div>

              {(localError || error) && (
                <div className="text-red-400 text-xs font-semibold bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
                  {localError || error}
                </div>
              )}

              <div className="flex gap-3">
                <button className="btn-ghost flex-1 justify-center py-3" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} /> Kembali
                </button>
                <button className="btn-primary flex-1 justify-center py-3" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Mendaftar...' : 'Selesaikan pendaftaran'}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-white/40 text-xs sm:text-sm mt-6">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-[#1D6FFF] hover:text-white transition-colors font-bold">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

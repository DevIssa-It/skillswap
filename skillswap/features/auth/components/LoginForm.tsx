'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft, Lock, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function LoginForm() {
  const { login, loading, error } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="min-h-screen grid-bg flex flex-col items-center justify-center px-4 sm:px-6 lg:px-16 py-12 relative z-10">
      <div className="w-full max-w-[440px] relative z-10">
        <div className="mb-8 text-center sm:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-[#1D6FFF] transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Selamat Datang Kembali</h1>
          <p className="text-white/50 text-sm">Masuk dan lanjutkan barter skillmu dengan mahasiswa lain.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5">
          <div>
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2 block">
              Email Kampus / Pribadi
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                className="input pl-11"
                placeholder="kamu@kampus.ac.id"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2 block">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                className="input pl-11 pr-12"
                placeholder="Masukkan password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-xs font-semibold bg-red-500/10 border border-red-500/20 rounded-xl p-3.5">
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary w-full justify-center text-sm py-3.5 mt-2" disabled={loading}>
            {loading ? 'Memverifikasi...' : 'Masuk ke Akun'}
          </button>
        </form>

        <p className="text-center text-white/40 text-xs sm:text-sm mt-6">
          Belum punya akun?{' '}
          <Link href="/register" className="text-[#1D6FFF] hover:text-white transition-colors font-bold">
            Daftar gratis
          </Link>
        </p>
      </div>
    </div>
  );
}

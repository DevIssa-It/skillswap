'use client';

import { useState, useEffect } from 'react';
import { Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { AppHeader } from '@/components/layout/AppHeader';
import { Spinner } from '@/components/ui/Spinner';
import { useSwapRequests } from '../hooks/useSwapRequests';
import { CATEGORIES_WITH_ALL, TIME_ESTIMATE_LABELS } from '@/constants/categories';
import { SwapRequest } from '@/types';

function SwapCard({ request }: { request: SwapRequest }) {
  return (
    <div
      className="glass rounded-2xl p-6 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1D6FFF] bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            {request.category}
          </span>
          <span className="text-xs text-white/40 font-medium">
            {TIME_ESTIMATE_LABELS[request.timeEstimate] || request.timeEstimate}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-white font-bold text-base">{request.offerSkill}</span>
          <span className="text-[#1D6FFF] font-bold text-sm">→</span>
          <span className="text-[#60A5FA] font-bold text-base">{request.needSkill}</span>
        </div>

        <p className="text-xs sm:text-sm text-white/60 leading-relaxed line-clamp-2 mb-6">
          {request.description || 'Tidak ada deskripsi tambahan untuk request swap ini.'}
        </p>
      </div>

      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm font-bold text-white">{request.user.name}</p>
          <p className="text-[11px] text-white/40">{request.user.campus}</p>
        </div>
        <div className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
          <span>{request.user.swapScore.toFixed(1)}</span>
          <span>⭐</span>
        </div>
      </div>
    </div>
  );
}

export function ExploreView() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('Semua');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { requests, loading } = useSwapRequests({
    category: category !== 'Semua' ? category : undefined,
    search: debouncedSearch || undefined,
  });

  return (
    <div className="min-h-screen grid-bg">
      <AppHeader backHref="/dashboard" title="Jelajahi Swap" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-[#1D6FFF]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#1D6FFF]">Jelajahi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Temukan Partner Swap</h1>
          <p className="text-white/50 text-sm">{requests.length} swap request aktif ditemukan</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            <input
              type="text"
              className="input pl-12"
              placeholder="Cari skill, nama, atau kampus..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            {CATEGORIES_WITH_ALL.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  category === cat
                    ? 'bg-[#1D6FFF] text-white shadow-md'
                    : 'glass text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Spinner size="lg" />
            <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">Mencari Request...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {requests.map((r) => (
              <SwapCard key={r.id} request={r} />
            ))}
          </div>
        )}

        {!loading && requests.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center my-12 border border-dashed border-white/10">
            <p className="text-white/40 text-lg mb-2">Tidak ada swap request ditemukan</p>
            <p className="text-xs text-white/30 mb-6">Coba kata kunci lain atau jadilah yang pertama mempublikasikan request ini.</p>
            <Link href="/post" className="btn-primary text-xs py-3 px-6">
              Buat Request Baru
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

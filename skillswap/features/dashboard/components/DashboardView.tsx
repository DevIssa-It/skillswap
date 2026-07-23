'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Star, Zap, Clock, AlertCircle, ArrowRight, CheckCircle, Flame } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Spinner } from '@/components/ui/Spinner';
import { ToastList } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import { useSocket } from '@/hooks/useSocket';
import { useMySwapRequests } from '@/features/swap/hooks/useSwapRequests';
import { useMatches } from '@/features/matches/hooks/useMatches';
import { authStorage } from '@/lib/auth';
import { User, MatchFoundEvent } from '@/types';

export function DashboardView() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { toasts, toast, dismiss } = useToast();

  const { requests, loading: reqLoading } = useMySwapRequests();
  const { matches, loading: matchLoading } = useMatches();

  const pendingMatches = matches.filter(m => m.status === 'pending');

  // Real-time socket listener
  useSocket({
    userId: user?.id,
    onMatchFound: (event: MatchFoundEvent) => {
      toast.info(
        '🎉 Match baru ditemukan!',
        `${event.requester.name} cocok dengan swap kamu — skor ${event.score}%`
      );
    },
  });

  useEffect(() => {
    const stored = authStorage.getUser();
    if (!stored) { router.push('/login'); return; }
    setUser(stored);
  }, [router]);

  if (!user || reqLoading || matchLoading) {
    return (
      <div className="min-h-screen grid-bg flex flex-col items-center justify-center gap-3">
        <Spinner size="lg" />
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">Memuat Dashboard...</p>
      </div>
    );
  }

  const activeRequests = requests.filter(r => r.status === 'active');

  return (
    <div className="min-h-screen grid-bg">
      <AppHeader notificationCount={pendingMatches.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-10">
        {/* Banner Welcome */}
        <div
          className="mb-8 p-6 sm:p-8 rounded-2xl glass relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#1D6FFF]">Dashboard Mahasiswa</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Halo, {user.name} 👋
            </h1>
            <p className="text-white/50 text-sm mt-1 flex items-center gap-2">
              <span>{user.campus}</span>
              <span>•</span>
              <span className="text-[#60A5FA] font-semibold">{user.skills.length} Skill Terdaftar</span>
            </p>
          </div>

          <Link href="/post" className="btn-primary text-xs py-3 px-6 shrink-0 relative z-10">
            <Plus size={16} /> Buat Swap Baru
          </Link>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#1D6FFF]/15 to-transparent pointer-events-none" />
        </div>

        {/* Key Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Swap Score', value: user.swapScore.toFixed(1), icon: Star, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
            { label: 'Total Swap', value: user.swapCount, icon: Zap, color: '#1D6FFF', bg: 'rgba(29,111,255,0.1)' },
            { label: 'Request Aktif', value: activeRequests.length, icon: Clock, color: '#14B8A6', bg: 'rgba(20,184,166,0.1)' },
            { label: 'Match Pending', value: pendingMatches.length, icon: AlertCircle, color: '#EC4899', bg: 'rgba(236,72,153,0.1)' },
          ].map((s) => (
            <div
              key={s.label}
              className="glass rounded-xl p-5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                  <s.icon size={20} style={{ color: s.color }} />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">{s.value}</div>
              <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* My Requests Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame size={18} className="text-[#1D6FFF]" />
                Swap Request Saya
              </h2>
              <Link href="/post" className="text-xs font-bold text-[#1D6FFF] hover:text-white transition-colors flex items-center gap-1">
                + Tambah Request
              </Link>
            </div>

            <div className="space-y-3">
              {requests.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center border border-dashed border-white/10">
                  <p className="text-white/40 text-sm mb-4">Kamu belum memiliki swap request yang aktif</p>
                  <Link href="/post" className="btn-primary text-xs py-2.5 px-5">Buat Request Pertama</Link>
                </div>
              ) : requests.map((r) => (
                <div
                  key={r.id}
                  className="glass rounded-xl p-5 relative"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm sm:text-base">{r.offerSkill}</span>
                        <span className="text-white/30 text-xs">→</span>
                        <span className="font-bold text-[#60A5FA] text-sm sm:text-base">{r.needSkill}</span>
                      </div>
                      <span className="text-xs font-semibold text-[#1D6FFF] mt-1 block">{r.category}</span>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      r.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/10 text-white/40'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/40 pt-3 border-t border-white/5">
                    <span>{r._count?.matches || 0} match ditemukan</span>
                    <Link href="/matches" className="text-[#1D6FFF] hover:underline font-semibold">Lihat Match</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Matches Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle size={18} className="text-emerald-400" />
                Match Terbaru
              </h2>
              <Link href="/matches" className="text-xs text-[#1D6FFF] hover:text-white transition-colors flex items-center gap-1 font-semibold">
                Lihat Semua <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {matches.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center border border-dashed border-white/10">
                  <p className="text-white/40 text-sm mb-2">Belum ada match terdeteksi</p>
                  <p className="text-xs text-white/30">Buat request swap untuk mulai pencarian otomatis</p>
                </div>
              ) : matches.slice(0, 4).map((m) => (
                <div
                  key={m.id}
                  className="glass rounded-xl p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-sm">{m.matchedUser.name}</h3>
                      <p className="text-xs text-white/40">{m.matchedUser.campus}</p>
                      <p className="text-xs font-semibold text-[#1D6FFF] mt-1">
                        {m.request.offerSkill} ↔ {m.request.needSkill}
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-lg font-black"
                        style={{ color: m.score >= 80 ? '#10B981' : '#F59E0B' }}
                      >
                        {Math.round(m.score)}%
                      </div>
                      <p className="text-[10px] uppercase font-bold text-white/40">Skor Match</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Registered Skills */}
        <div
          className="mt-8 glass rounded-2xl p-6"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Skill Milik Saya</h2>
          <div className="flex flex-wrap gap-2">
            {user.skills.map(s => (
              <span key={s} className="skill-badge">{s}</span>
            ))}
          </div>
        </div>
      </main>

      <ToastList toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}

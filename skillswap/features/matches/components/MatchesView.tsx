'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Star, MessageCircle, Trophy } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Spinner } from '@/components/ui/Spinner';
import { ToastList } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import { useMatches } from '../hooks/useMatches';
import { Match } from '@/types';

// ─── Rating Modal ──────────────────────────────────────────────────────────────
interface RatingModalProps {
  matchId: string;
  onSubmit: (score: number, comment: string) => void;
  onClose: () => void;
}

function RatingModal({ onSubmit, onClose }: RatingModalProps) {
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState('');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
    >
      <div
        className="glass rounded-2xl p-6 sm:p-8 w-full max-w-sm border border-zinc-800"
      >
        <h3 className="text-xl font-black text-white mb-1 text-center">Beri Rating</h3>
        <p className="text-white/50 text-xs mb-6 text-center">Bagaimana pengalaman barter skill-mu?</p>
        
        <div className="flex gap-2 justify-center mb-6">
          {[1, 2, 3, 4, 5].map(s => (
            <button
              key={s}
              onClick={() => setScore(s)}
              className="p-1 cursor-pointer"
              aria-label={`Rate ${s} stars`}
            >
              <Star
                size={32}
                fill={s <= score ? '#F59E0B' : 'transparent'}
                className={s <= score ? 'text-[#F59E0B]' : 'text-white/20'}
              />
            </button>
          ))}
        </div>
        
        <textarea
          className="input resize-none mb-4 text-xs"
          rows={3}
          placeholder="Tulis ulasan/komentar (opsional)..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        
        <div className="flex gap-3">
          <button className="btn-ghost flex-1 justify-center py-2.5 text-xs" onClick={onClose}>Batal</button>
          <button className="btn-primary flex-1 justify-center py-2.5 text-xs" onClick={() => onSubmit(score, comment)}>Kirim Rating</button>
        </div>
      </div>
    </div>
  );
}

// ─── Match Card ────────────────────────────────────────────────────────────────
interface MatchCardProps {
  match: Match;
  actionLoading: string | null;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onComplete: (id: string) => void;
  onRate: (id: string) => void;
}

function MatchCard({ match: m, actionLoading, onAccept, onReject, onComplete, onRate }: MatchCardProps) {
  const scoreColor = m.score >= 80 ? '#10B981' : m.score >= 60 ? '#F59E0B' : '#EF4444';
  const isLoading = actionLoading === m.id;

  return (
    <div
      className="glass rounded-2xl p-5 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
        {/* Score Circle Badge */}
        <div
          className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center border"
          style={{ background: `${scoreColor}15`, borderColor: `${scoreColor}40` }}
        >
          <span className="text-xl sm:text-2xl font-black" style={{ color: scoreColor }}>
            {Math.round(m.score)}
          </span>
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">% Match</span>
        </div>

        <div className="flex-grow">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-black text-white text-base sm:text-lg">{m.matchedUser.name}</h3>
              <p className="text-xs sm:text-sm text-white/50">{m.matchedUser.campus}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={13} className="text-[#F59E0B]" fill="currentColor" />
                <span className="text-xs font-semibold text-white/60">
                  {m.matchedUser.swapScore.toFixed(1)} · {m.matchedUser.swapCount} swap selesai
                </span>
              </div>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
              m.status === 'pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
              m.status === 'accepted' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
              m.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
              'bg-white/10 text-white/40'
            }`}>
              {m.status === 'pending' ? 'Menunggu' : m.status === 'accepted' ? 'Aktif' : m.status === 'completed' ? 'Selesai' : m.status}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4 bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="skill-badge">{m.request.offerSkill}</span>
            <span className="text-[#1D6FFF] font-bold text-xs">↔</span>
            <span className="skill-badge">{m.request.needSkill}</span>
          </div>

          {m.status === 'accepted' && m.contactRevealed && (
            <div className="rounded-xl p-4 mb-4 border border-[#1D6FFF]/30 bg-[#1D6FFF]/10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1D6FFF] mb-1">Kontak Terungkap</p>
              <p className="text-white font-bold text-sm flex items-center gap-2">
                <MessageCircle size={16} className="text-[#1D6FFF]" />
                {m.matchedUser.email}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {m.status === 'pending' && (
              <>
                <button
                  onClick={() => onAccept(m.id)}
                  disabled={isLoading}
                  className="btn-primary text-xs py-2.5 px-5 gap-1.5"
                >
                  {isLoading ? '...' : <><CheckCircle2 size={16} /> Terima Match</>}
                </button>
                <button
                  onClick={() => onReject(m.id)}
                  disabled={isLoading}
                  className="btn-ghost text-xs py-2.5 px-5 gap-1.5"
                >
                  <XCircle size={16} /> Lewati
                </button>
              </>
            )}
            {m.status === 'accepted' && (
              <button
                onClick={() => onComplete(m.id)}
                disabled={isLoading}
                className="btn-primary text-xs py-2.5 px-5 gap-1.5"
              >
                {isLoading ? '...' : <><Trophy size={16} /> Tandai Selesai</>}
              </button>
            )}
            {m.status === 'completed' && !m.rating && (
              <button
                onClick={() => onRate(m.id)}
                className="btn-ghost text-xs py-2.5 px-5 gap-1.5"
              >
                <Star size={16} /> Beri Rating
              </button>
            )}
            {m.status === 'completed' && m.rating && (
              <div className="flex items-center gap-1 text-[#F59E0B] bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                {Array.from({ length: m.rating.score }).map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" />
                ))}
                <span className="text-xs font-semibold text-white/50 ml-1">Rating Terkirim</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Matches View ──────────────────────────────────────────────────────────────
type FilterType = 'all' | 'pending' | 'accepted' | 'completed';

export function MatchesView() {
  const { matches, loading, actionLoading, accept, reject, complete, rate } = useMatches();
  const { toasts, toast, dismiss } = useToast();
  const [filter, setFilter] = useState<FilterType>('all');
  const [ratingMatchId, setRatingMatchId] = useState<string | null>(null);

  const handleAccept = async (id: string) => {
    await accept(id);
    toast.success('Match diterima!', 'Kontak sudah terungkap — segera hubungi partner swap-mu');
  };
  const handleReject = async (id: string) => { await reject(id); };
  const handleComplete = async (id: string) => {
    await complete(id);
    setRatingMatchId(id);
    toast.success('Swap selesai! 🎉', 'Berikan rating untuk partner swap-mu');
  };
  const handleRate = async (score: number, comment: string) => {
    if (!ratingMatchId) return;
    await rate(ratingMatchId, score, comment);
    setRatingMatchId(null);
    toast.success('Rating dikirim!', 'Terima kasih atas reviewmu');
  };

  const filtered = filter === 'all' ? matches : matches.filter(m => m.status === filter);
  const FILTER_LABELS: Record<FilterType, string> = { all: 'Semua', pending: 'Menunggu', accepted: 'Aktif', completed: 'Selesai' };

  return (
    <div className="min-h-screen grid-bg">
      <AppHeader backHref="/dashboard" title="Match Saya" notificationCount={matches.filter(m => m.status === 'pending').length} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-10">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 flex-wrap items-center">
          {(Object.keys(FILTER_LABELS) as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === f
                  ? 'bg-[#1D6FFF] text-white shadow-md'
                  : 'glass text-white/50 hover:text-white'
              }`}
            >
              {FILTER_LABELS[f]}
              <span className="ml-1.5 opacity-60">
                ({f === 'all' ? matches.length : matches.filter(m => m.status === f).length})
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Spinner size="lg" />
            <p className="text-xs text-white/40 font-semibold uppercase tracking-widest">Memuat Match...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(m => (
              <MatchCard
                key={m.id}
                match={m}
                actionLoading={actionLoading}
                onAccept={handleAccept}
                onReject={handleReject}
                onComplete={handleComplete}
                onRate={id => setRatingMatchId(id)}
              />
            ))}
            {filtered.length === 0 && (
              <div className="glass rounded-2xl p-12 text-center my-8 border border-dashed border-white/10">
                <p className="text-white/40 text-base mb-2">Belum ada match di kategori ini</p>
                <p className="text-xs text-white/30 mb-6">Buat swap request baru untuk mulai mendapatkan match otomatis.</p>
                <a href="/post" className="btn-primary text-xs py-3 px-6 inline-flex">
                  Buat Swap Request
                </a>
              </div>
            )}
          </div>
        )}
      </main>

      {ratingMatchId && (
        <RatingModal matchId={ratingMatchId} onSubmit={handleRate} onClose={() => setRatingMatchId(null)} />
      )}

      <ToastList toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}

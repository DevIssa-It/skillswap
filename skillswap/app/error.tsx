'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen grid-bg flex flex-col items-center justify-center p-6 text-center">
      <div className="glass rounded-3xl p-8 max-w-md w-full border border-white/20">
        <h2 className="text-2xl font-black text-white mb-2">Terjadi Kesalahan</h2>
        <p className="text-white/60 text-sm mb-6">{error?.message || 'Gagal memuat komponen halaman.'}</p>
        <div className="flex gap-3">
          <button onClick={() => reset()} className="btn-primary flex-1 text-xs py-3">
            Coba Lagi
          </button>
          <Link href="/" className="btn-ghost flex-1 text-xs py-3">
            Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

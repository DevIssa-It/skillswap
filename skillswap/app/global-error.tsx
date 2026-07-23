'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body className="bg-[#03050F] text-white min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="bg-[#080D1C] border border-white/20 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <h2 className="text-2xl font-black mb-2">Terjadi Kesalahan Sistem</h2>
          <p className="text-white/60 text-sm mb-6">{error?.message || 'Sistem mengalami gangguan sementara.'}</p>
          <button
            onClick={() => reset()}
            className="w-full py-3 px-6 bg-[#1D6FFF] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg hover:bg-[#1050CC] transition-colors"
          >
            Muat Ulang
          </button>
        </div>
      </body>
    </html>
  );
}

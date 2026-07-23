import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen grid-bg flex flex-col items-center justify-center p-6 text-center">
      <div className="glass rounded-3xl p-8 max-w-md w-full border border-white/20">
        <h1 className="text-6xl font-black text-[#1D6FFF] mb-2">404</h1>
        <h2 className="text-xl font-bold text-white mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-white/60 text-sm mb-6">Halaman yang kamu cari tidak tersedia atau telah dipindahkan.</p>
        <Link href="/" className="btn-primary inline-flex text-xs py-3 px-6">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

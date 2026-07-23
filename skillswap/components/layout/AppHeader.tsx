'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Bell, Plus, ArrowLeft } from 'lucide-react';
import { authService } from '@/features/auth/services/auth.service';

interface AppHeaderProps {
  title?: string;
  notificationCount?: number;
  backHref?: string;
  actions?: React.ReactNode;
}

export function AppHeader({
  title,
  notificationCount = 0,
  backHref,
  actions,
}: AppHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await authService.logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#03050F]/85 backdrop-blur-xl py-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {backHref && (
            <Link
              href={backHref}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Kembali"
            >
              <ArrowLeft size={18} />
            </Link>
          )}

          <Link href="/" className="text-xl sm:text-2xl font-black tracking-tighter flex items-center gap-0.5">
            <span className="text-white font-black">SKILL</span>
            <span className="text-[#1D6FFF] font-black">SWAP</span>
          </Link>

          {title && (
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1D6FFF] bg-[#1D6FFF]/10 border border-[#1D6FFF]/20 px-3 py-1 rounded-full">
                {title}
              </span>
            </div>
          )}
        </div>

        <nav className="flex items-center gap-2 sm:gap-3">
          {actions}

          <Link
            href="/post"
            className="btn-primary text-xs py-2 px-3.5 sm:px-5 gap-1.5"
            aria-label="Buat request barter skill"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Buat Request</span>
          </Link>

          {notificationCount > 0 && (
            <Link
              href="/matches"
              className="relative w-9 h-9 rounded-xl bg-[#1D6FFF]/10 border border-[#1D6FFF]/30 flex items-center justify-center text-[#1D6FFF] hover:bg-[#1D6FFF]/20 transition-all"
              aria-label={`${notificationCount} match menunggu`}
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1D6FFF] text-white rounded-full text-[10px] font-extrabold flex items-center justify-center shadow-lg">
                {notificationCount}
              </span>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
            aria-label="Logout"
          >
            <LogOut size={18} />
          </button>
        </nav>
      </div>
    </header>
  );
}

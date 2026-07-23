'use client';

import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { Toast, ToastType } from '@/types';

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />,
  error: <XCircle size={18} className="text-red-400 shrink-0" />,
  warning: <AlertTriangle size={18} className="text-amber-400 shrink-0" />,
  info: <Info size={18} className="text-[#1D6FFF] shrink-0" />,
};

const borders: Record<ToastType, string> = {
  success: 'border-emerald-500/30',
  error: 'border-red-500/30',
  warning: 'border-amber-500/30',
  info: 'border-[#1D6FFF]/40',
};

interface ToastListProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastList({ toasts, onDismiss }: ToastListProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto glass rounded-2xl p-4 flex items-start gap-3 border ${borders[t.type]}`}
        >
          <span className="mt-0.5">{icons[t.type]}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white">{t.title}</p>
            {t.message && (
              <p className="text-xs text-white/50 mt-0.5">{t.message}</p>
            )}
          </div>
          <button
            onClick={() => onDismiss(t.id)}
            className="text-white/30 hover:text-white transition-colors shrink-0 cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

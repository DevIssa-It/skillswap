'use client';

import { useState, useCallback } from 'react';
import { Toast, ToastType } from '@/types';

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (type: ToastType, title: string, message?: string, duration = 4000) => {
      const id = generateId();
      const toast: Toast = { id, type, title, message };

      setToasts((prev) => [...prev, toast]);

      // Auto-dismiss
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);

      return id;
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    toast: {
      success: (title: string, message?: string) =>
        addToast('success', title, message),
      error: (title: string, message?: string) =>
        addToast('error', title, message),
      info: (title: string, message?: string) =>
        addToast('info', title, message),
      warning: (title: string, message?: string) =>
        addToast('warning', title, message),
    },
    dismiss,
  };
}

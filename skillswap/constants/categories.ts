export const CATEGORIES = ['Design', 'Programming', 'Akademik', 'Konten', 'Lainnya'] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORIES_WITH_ALL = ['Semua', ...CATEGORIES] as const;

export const CAMPUSES = [
  'Universitas Indonesia',
  'ITB',
  'UGM',
  'ITS',
  'UNPAD',
  'BINUS',
  'UNDIP',
  'UNAIR',
  'UNHAS',
  'UB',
  'UNS',
  'UNSRI',
  'Universitas Lainnya',
] as const;

export const TIME_ESTIMATES = [
  { value: '1_hour', label: '~1 Jam' },
  { value: '1_day', label: '~1 Hari' },
  { value: '1_week', label: '~1 Minggu' },
] as const;

export const TIME_ESTIMATE_LABELS: Record<string, string> = {
  '1_hour': '~1 jam',
  '1_day': '~1 hari',
  '1_week': '~1 minggu',
};

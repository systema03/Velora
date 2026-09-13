import type { DateFormatPreference } from '@/types';

export function formatDate(date: string, prefs?: DateFormatPreference): string {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  const sep = '/';

  switch (prefs) {
    case 'mdy':
      return `${month}${sep}${day}${sep}${year}`;
    case 'ymd':
      return `${year}${sep}${month}${sep}${day}`;
    default:
      return `${day}${sep}${month}${sep}${year}`;
  }
}

export function formatTime(date: string): string {
  const d = new Date(date);
  return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

export function formatRelative(date: string): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays === 0) {
    if (diffHours === 0) return 'Hace un momento';
    if (diffHours === 1) return 'Hace 1 hora';
    return `Hace ${diffHours} horas`;
  }
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  return formatDate(date);
}

export function formatTodayLong(): string {
  const d = new Date();
  return d.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function isToday(date: string): boolean {
  const d = new Date(date);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

export function isUpcoming(date: string): boolean {
  const d = new Date(date);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return target.getTime() > today.getTime();
}

export function isOverdue(date: string): boolean {
  const d = new Date(date);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return target.getTime() < today.getTime();
}

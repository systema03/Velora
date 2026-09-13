import { useState, useRef, useEffect } from 'react';
import {
  FilePlus,
  CheckSquare,
  SquarePen,
  CheckCircle2,
  Bell,
  Receipt,
  MoreVertical,
  Share,
  Pencil,
  Trash2,
} from 'lucide-react';
import type { ActivityItem, ActivityType } from '@/types';
import { formatRelative, formatTime } from '@/lib/format';

const typeConfig: Record<ActivityType, { icon: typeof FilePlus; color: string; bg: string }> = {
  document_added: { icon: FilePlus, color: 'text-teal-600', bg: 'bg-teal-50' },
  task_created: { icon: CheckSquare, color: 'text-petroleum-700', bg: 'bg-petroleum-50' },
  task_updated: { icon: SquarePen, color: 'text-petroleum-700', bg: 'bg-petroleum-50' },
  task_completed: { icon: CheckCircle2, color: 'text-success-500', bg: 'bg-success-50' },
  reminder_upcoming: { icon: Bell, color: 'text-warning-600', bg: 'bg-warning-50' },
  receipt_registered: { icon: Receipt, color: 'text-teal-600', bg: 'bg-teal-50' },
};

const statusLabels: Record<string, string> = {
  done: 'Completado',
  pending: 'Pendiente',
  overdue: 'Vencido',
  info: 'Informativo',
};

const statusBadges: Record<string, string> = {
  done: 'bg-success-50 text-success-600',
  pending: 'bg-petroleum-50 text-petroleum-700',
  overdue: 'bg-danger-50 text-danger-600',
  info: 'bg-gray-100 text-ink-muted',
};

interface ActivityRowProps {
  item: ActivityItem;
}

export function ActivityRow({ item }: ActivityRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const config = typeConfig[item.type];
  const Icon = config.icon;

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <li className="relative flex items-start gap-3 px-4 sm:px-6 py-3 hover:bg-gray-50/50 transition-colors">
      <span className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
        <Icon className={`w-5 h-5 ${config.color}`} strokeWidth={2} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-ink truncate leading-snug">
            {item.title}
          </h3>
          <time
            className="text-xs text-ink-subtle shrink-0 mt-0.5 tabular-nums"
            dateTime={item.timestamp}
          >
            {formatRelative(item.timestamp)}
          </time>
        </div>
        <p className="text-sm text-ink-muted truncate mt-0.5">
          {item.detail}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${statusBadges[item.status]}`}
          >
            {statusLabels[item.status]}
          </span>
          <span className="text-[11px] text-ink-subtle tabular-nums">
            {formatTime(item.timestamp)}
          </span>
        </div>
      </div>
      <div ref={menuRef} className="relative shrink-0">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={`Acciones para ${item.title}`}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="p-2 rounded-lg text-ink-subtle hover:text-ink hover:bg-gray-100 transition-colors touch-target"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-full mt-1 w-44 rounded-xl bg-surface border border-gray-100 shadow-card py-1 z-20 animate-fade-in"
          >
            <button
              role="menuitem"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink-muted hover:bg-gray-50 hover:text-ink transition-colors"
            >
              <Share className="w-4 h-4" />
              Compartir
            </button>
            <button
              role="menuitem"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink-muted hover:bg-gray-50 hover:text-ink transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Editar
            </button>
            <button
              role="menuitem"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-danger-600 hover:bg-danger-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

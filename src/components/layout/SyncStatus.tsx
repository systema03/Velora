import { RefreshCw, Check } from 'lucide-react';
import type { SyncState } from '@/types';

interface SyncStatusProps {
  state: SyncState;
  onSync: () => void;
}

export function SyncStatus({ state, onSync }: SyncStatusProps) {
  const syncing = state === 'syncing';
  const synced = state === 'synced';

  return (
    <button
      onClick={onSync}
      aria-label={syncing ? 'Sincronizando…' : synced ? 'Sincronizado' : 'Sincronizar ahora'}
      className="relative flex items-center gap-2 px-3 py-2 rounded-xl touch-target transition-colors hover:bg-petroleum-50"
    >
      {syncing ? (
        <RefreshCw className="w-5 h-5 text-teal-500 animate-spin-slow" />
      ) : synced ? (
        <Check className="w-5 h-5 text-success-500" />
      ) : (
        <RefreshCw className="w-5 h-5 text-petroleum-700" />
      )}
      <span className="text-sm font-medium text-petroleum-700 hidden sm:inline">
        {syncing ? 'Sincronizando…' : synced ? 'Sincronizado' : 'Sincronizar'}
      </span>
      {synced && (
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-success-500 animate-pulse-soft" />
      )}
    </button>
  );
}

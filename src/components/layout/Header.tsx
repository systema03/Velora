import { SyncStatus } from './SyncStatus';
import type { SyncState } from '@/types';
import { formatTodayLong } from '@/lib/format';

interface HeaderProps {
  syncState: SyncState;
  onSync: () => void;
}

export function Header({ syncState, onSync }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-gray-100 safe-top">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/brand/velora-logo-light.svg"
            alt="Velora"
            className="h-8 w-auto sm:h-9"
          />
          <span className="hidden sm:block text-sm text-ink-muted capitalize-first">
            {formatTodayLong()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="sm:hidden text-xs text-ink-muted capitalize-first">
            {formatTodayLong()}
          </span>
          <SyncStatus state={syncState} onSync={onSync} />
        </div>
      </div>
    </header>
  );
}

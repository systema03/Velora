import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { DesktopSidebar } from './DesktopSidebar';
import { FloatingAddButton } from './FloatingAddButton';
import { QuickAddSheet, type QuickAddAction } from './QuickAddSheet';
import { useVeloraStore } from '@/store/useStore';

interface AppShellProps {
  onQuickAdd: (action: QuickAddAction) => void;
  showFab?: boolean;
}

export function AppShell({ onQuickAdd, showFab = true }: AppShellProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { syncState, triggerSync } = useVeloraStore();

  const handleAction = (action: QuickAddAction) => {
    onQuickAdd(action);
  };

  return (
    <div className="min-h-[100dvh] bg-surface-alt flex">
      <DesktopSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header syncState={syncState} onSync={triggerSync} />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>
      <BottomNavigation />
      {showFab && (
        <>
          <FloatingAddButton onClick={() => setSheetOpen(true)} />
          <QuickAddSheet
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            onAction={handleAction}
          />
        </>
      )}
    </div>
  );
}

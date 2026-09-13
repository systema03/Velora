import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { ActivityPage } from '@/pages/ActivityPage';
import { DocumentsPage } from '@/pages/DocumentsPage';
import { PendingPage } from '@/pages/PendingPage';
import { SettingsPage } from '@/pages/SettingsPage';
import type { QuickAddAction } from '@/components/layout/QuickAddSheet';

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 1600);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <main className="splash-screen" aria-label="Cargando Velora">
      <div className="splash-brand">
        <img
          src="/brand/velora-mark.svg"
          alt=""
          className="splash-mark"
        />
        <span className="splash-name">VELORA</span>
      </div>
    </main>
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  const handleQuickAdd = (action: QuickAddAction) => {
    switch (action) {
      case 'new_task':
      case 'new_reminder':
        navigate('/pending', { state: { openTaskForm: true } });
        break;
      case 'scan_document':
      case 'import_file':
        navigate('/documents', { state: { docMode: 'document' } });
        break;
      case 'register_receipt':
        navigate('/documents', { state: { docMode: 'receipt' } });
        break;
    }
  };

  return (
    <Routes>
      <Route element={<AppShell onQuickAdd={handleQuickAdd} />}>
        <Route path="/" element={<ActivityPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/pending" element={<PendingPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

import { NavLink } from 'react-router-dom';
import { Activity, FileText, CheckSquare, Settings } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Actividad', icon: Activity, end: true },
  { to: '/documents', label: 'Documentos', icon: FileText, end: false },
  { to: '/pending', label: 'Pendientes', icon: CheckSquare, end: false },
  { to: '/settings', label: 'Ajustes', icon: Settings, end: false },
];

export function DesktopSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-gray-100 bg-surface h-[100dvh] sticky top-0">
      <div className="px-6 py-5 border-b border-gray-100">
        <img
          src="/brand/velora-logo-light.svg"
          alt="Velora"
          className="h-9 w-auto"
        />
      </div>
      <nav aria-label="Navegación principal" className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all touch-target ${
                      isActive
                        ? 'bg-petroleum-50 text-petroleum-700'
                        : 'text-ink-muted hover:bg-gray-50 hover:text-ink'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="px-6 py-4 border-t border-gray-100">
        <p className="text-xs text-ink-subtle">
          Velora v1.0 · Fase 1
        </p>
      </div>
    </aside>
  );
}

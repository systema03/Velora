import { NavLink } from 'react-router-dom';
import { Activity, FileText, CheckSquare, Settings } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Actividad', icon: Activity, end: true },
  { to: '/documents', label: 'Documentos', icon: FileText, end: false },
  { to: '/pending', label: 'Pendientes', icon: CheckSquare, end: false },
  { to: '/settings', label: 'Ajustes', icon: Settings, end: false },
];

export function BottomNavigation() {
  return (
    <nav
      aria-label="Navegación principal"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-gray-100 safe-bottom"
    >
      <div className="flex items-stretch justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl transition-colors touch-target ${
                  isActive
                    ? 'text-petroleum-700'
                    : 'text-ink-subtle hover:text-ink-muted'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className="w-5 h-5"
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="text-[11px] font-medium leading-none">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

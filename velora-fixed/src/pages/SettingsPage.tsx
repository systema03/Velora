import { useState } from 'react';
import {
  Palette,
  Bell,
  Calendar,
  Download,
  Info,
  ChevronRight,
  Sun,
  Moon,
  Monitor,
  Check,
} from 'lucide-react';
import type { ThemePreference, DateFormatPreference } from '@/types';

export function SettingsPage() {
  const [theme, setTheme] = useState<ThemePreference>('system');
  const [notifications, setNotifications] = useState(true);
  const [dateFormat, setDateFormat] = useState<DateFormatPreference>('dmy');

  const themeOptions: { value: ThemePreference; label: string; icon: typeof Sun }[] = [
    { value: 'light', label: 'Claro', icon: Sun },
    { value: 'dark', label: 'Oscuro', icon: Moon },
    { value: 'system', label: 'Sistema', icon: Monitor },
  ];

  const dateOptions: { value: DateFormatPreference; label: string }[] = [
    { value: 'dmy', label: 'DD/MM/AAAA' },
    { value: 'mdy', label: 'MM/DD/AAAA' },
    { value: 'ymd', label: 'AAAA/MM/DD' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="px-4 sm:px-6 pt-4">
        <h1 className="text-xl font-bold text-ink">Ajustes</h1>
      </div>

      <div className="px-4 sm:px-6 pt-4 space-y-6 max-w-2xl">
        {/* Appearance */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-4 h-4 text-petroleum-700" />
            <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
              Apariencia
            </h2>
          </div>
          <div className="bg-surface rounded-xl border border-gray-100 shadow-soft p-2">
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                const active = theme === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    aria-pressed={active}
                    className={`flex flex-col items-center gap-2 py-3 rounded-xl border-2 transition-all touch-target ${
                      active
                        ? 'border-petroleum-300 bg-petroleum-50'
                        : 'border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-petroleum-700' : 'text-ink-muted'}`} />
                    <span className={`text-sm font-medium ${active ? 'text-petroleum-700' : 'text-ink-muted'}`}>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-petroleum-700" />
            <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
              Notificaciones
            </h2>
          </div>
          <div className="bg-surface rounded-xl border border-gray-100 shadow-soft divide-y divide-gray-50">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <h3 className="text-sm font-medium text-ink">Notificaciones push</h3>
                <p className="text-xs text-ink-subtle mt-0.5">
                  Recibir avisos de tareas y recordatorios
                </p>
              </div>
              <button
                onClick={() => setNotifications((v) => !v)}
                role="switch"
                aria-checked={notifications}
                aria-label="Activar notificaciones"
                className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${
                  notifications ? 'bg-teal-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-soft transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Date format */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-petroleum-700" />
            <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
              Preferencias de fecha
            </h2>
          </div>
          <div className="bg-surface rounded-xl border border-gray-100 shadow-soft p-2 space-y-1">
            {dateOptions.map((opt) => {
              const active = dateFormat === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setDateFormat(opt.value)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors touch-target"
                >
                  <span className={`text-sm font-medium ${active ? 'text-petroleum-700' : 'text-ink-muted'}`}>
                    {opt.label}
                  </span>
                  {active && <Check className="w-4 h-4 text-teal-500" />}
                </button>
              );
            })}
          </div>
        </section>

        {/* Export */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Download className="w-4 h-4 text-petroleum-700" />
            <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
              Exportación
            </h2>
          </div>
          <div className="bg-surface rounded-xl border border-gray-100 shadow-soft divide-y divide-gray-50">
            <button
              onClick={() => {}}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors touch-target"
            >
              <div className="text-left">
                <h3 className="text-sm font-medium text-ink">Exportar datos</h3>
                <p className="text-xs text-ink-subtle mt-0.5">
                  Descargar documentos y tareas (próximamente)
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-ink-subtle shrink-0" />
            </button>
          </div>
        </section>

        {/* About */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-petroleum-700" />
            <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
              Acerca de Velora
            </h2>
          </div>
          <div className="bg-surface rounded-xl border border-gray-100 shadow-soft p-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/brand/velora-mark.svg"
                alt="Símbolo de Velora"
                className="w-10 h-10"
              />
              <div>
                <h3 className="text-sm font-bold text-ink">Velora</h3>
                <p className="text-xs text-ink-subtle">Versión 1.0.0 · Fase 1</p>
              </div>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              Organizador corporativo de documentos, recibos, tareas y recordatorios.
              Diseñado para mantener tu actividad ordenada y accesible.
            </p>
          </div>
        </section>

        <div className="h-4" />
      </div>
    </div>
  );
}

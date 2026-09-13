import { CheckSquare, FileText, Bell } from 'lucide-react';

interface SummaryStripProps {
  pendingCount: number;
  documentCount: number;
  reminderCount: number;
}

export function SummaryStrip({ pendingCount, documentCount, reminderCount }: SummaryStripProps) {
  const items = [
    { label: 'Pendientes', value: pendingCount, icon: CheckSquare, color: 'text-petroleum-700', bg: 'bg-petroleum-50' },
    { label: 'Documentos', value: documentCount, icon: FileText, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Recordatorios', value: reminderCount, icon: Bell, color: 'text-warning-600', bg: 'bg-warning-50' },
  ];

  return (
    <div className="px-4 sm:px-6 pt-4">
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl bg-surface border border-gray-100 shadow-soft"
            >
              <span className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center`}>
                <Icon className={`w-4.5 h-4.5 ${item.color}`} strokeWidth={2} />
              </span>
              <span className="text-xl font-bold text-ink tabular-nums leading-none">
                {item.value}
              </span>
              <span className="text-[11px] text-ink-muted font-medium leading-none">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

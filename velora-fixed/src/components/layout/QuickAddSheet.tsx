import { useEffect } from 'react';
import { CheckSquare, Bell, ScanLine, Receipt, FileUp, X } from 'lucide-react';

interface QuickAddSheetProps {
  open: boolean;
  onClose: () => void;
  onAction: (action: QuickAddAction) => void;
}

export type QuickAddAction = 'new_task' | 'new_reminder' | 'scan_document' | 'register_receipt' | 'import_file';

const actions: { id: QuickAddAction; label: string; icon: typeof CheckSquare; description: string }[] = [
  { id: 'new_task', label: 'Nueva tarea', icon: CheckSquare, description: 'Crear una tarea o pendiente' },
  { id: 'new_reminder', label: 'Nuevo recordatorio', icon: Bell, description: 'Programar un aviso' },
  { id: 'scan_document', label: 'Escanear documento', icon: ScanLine, description: 'Capturar con la cámara' },
  { id: 'register_receipt', label: 'Registrar recibo', icon: Receipt, description: 'Añadir un recibo de gasto' },
  { id: 'import_file', label: 'Importar archivo', icon: FileUp, description: 'Subir desde el dispositivo' },
];

export function QuickAddSheet({ open, onClose, onAction }: QuickAddSheetProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:z-40">
      <div
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Acciones rápidas"
        className="absolute bottom-0 left-0 right-0 lg:left-auto lg:w-96 bg-surface rounded-t-2xl lg:rounded-2xl lg:bottom-6 lg:right-6 shadow-sheet animate-slide-up safe-bottom"
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <h2 className="text-base font-semibold text-ink">Acciones rápidas</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="p-2 rounded-xl text-ink-subtle hover:bg-gray-100 transition-colors touch-target"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-3 pb-4 pt-1">
          <ul className="space-y-1">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <li key={action.id}>
                  <button
                    onClick={() => {
                      onAction(action.id);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-petroleum-50 transition-colors text-left touch-target"
                  >
                    <span className="w-10 h-10 rounded-xl bg-petroleum-50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-petroleum-700" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-ink">
                        {action.label}
                      </span>
                      <span className="block text-xs text-ink-subtle truncate">
                        {action.description}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { X, Flag, Calendar } from 'lucide-react';
import type { TaskItem, TaskPriority } from '@/types';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; notes?: string; priority: TaskPriority; dueDate: string }) => void;
  editingTask?: TaskItem | null;
}

const priorityConfig: { value: TaskPriority; label: string; color: string; dot: string }[] = [
  { value: 'low', label: 'Baja', color: 'text-ink-muted', dot: 'bg-gray-300' },
  { value: 'medium', label: 'Media', color: 'text-warning-600', dot: 'bg-warning-500' },
  { value: 'high', label: 'Alta', color: 'text-danger-600', dot: 'bg-danger-500' },
];

export function TaskForm({ open, onClose, onSubmit, editingTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setNotes(editingTask.notes ?? '');
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
    } else {
      setTitle('');
      setNotes('');
      setPriority('medium');
      setDueDate(new Date().toISOString().slice(0, 10));
    }
  }, [editingTask, open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      notes: notes.trim() || undefined,
      priority,
      dueDate: dueDate || new Date().toISOString().slice(0, 10),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={editingTask ? 'Editar tarea' : 'Nueva tarea'}
        className="absolute bottom-0 left-0 right-0 lg:left-auto lg:w-[480px] bg-surface rounded-t-2xl lg:rounded-2xl lg:bottom-6 lg:right-6 shadow-sheet animate-slide-up safe-bottom max-h-[85dvh] overflow-y-auto"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between px-5 pt-4 pb-2 sticky top-0 bg-surface">
            <h2 className="text-base font-semibold text-ink">
              {editingTask ? 'Editar tarea' : 'Nueva tarea'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="p-2 rounded-xl text-ink-subtle hover:bg-gray-100 transition-colors touch-target"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-5 pb-5 space-y-4">
            <div>
              <label htmlFor="task-title" className="block text-sm font-medium text-ink mb-1.5">
                Título
              </label>
              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Revisar contrato de proveedor"
                autoFocus
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-ink placeholder:text-ink-subtle focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="task-notes" className="block text-sm font-medium text-ink mb-1.5">
                Notas <span className="text-ink-subtle font-normal">(opcional)</span>
              </label>
              <textarea
                id="task-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Detalles adicionales…"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-ink placeholder:text-ink-subtle focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <span className="flex items-center gap-1.5 text-sm font-medium text-ink mb-2">
                <Flag className="w-4 h-4" />
                Prioridad
              </span>
              <div className="flex gap-2">
                {priorityConfig.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    aria-pressed={priority === p.value}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all touch-target ${
                      priority === p.value
                        ? 'bg-petroleum-50 border-2 border-petroleum-300'
                        : 'bg-surface border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${p.dot}`} />
                    <span className={priority === p.value ? p.color : 'text-ink-muted'}>
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="task-due" className="flex items-center gap-1.5 text-sm font-medium text-ink mb-1.5">
                <Calendar className="w-4 h-4" />
                Fecha de vencimiento
              </label>
              <input
                id="task-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-ink focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-colors"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-ink-muted hover:bg-gray-50 transition-colors touch-target"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="flex-1 py-2.5 rounded-xl bg-petroleum-700 text-white text-sm font-medium hover:bg-petroleum-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors touch-target"
              >
                {editingTask ? 'Guardar' : 'Crear tarea'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

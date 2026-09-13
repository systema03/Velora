import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckSquare, Inbox, AlertCircle } from 'lucide-react';
import { useVeloraStore } from '@/store/useStore';
import { FilterChips } from '@/components/ui/FilterChips';
import { EmptyState } from '@/components/ui/EmptyState';
import { TaskForm } from '@/components/tasks/TaskForm';
import { formatDate, isToday, isOverdue } from '@/lib/format';
import type { TaskItem, TaskSection, TaskPriority } from '@/types';

type Filter = 'all' | TaskSection;

const allSections: TaskSection[] = ['today', 'upcoming', 'completed'];

const priorityDots: Record<TaskPriority, string> = {
  low: 'bg-gray-300',
  medium: 'bg-warning-500',
  high: 'bg-danger-500',
};

const priorityLabels: Record<TaskPriority, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

const sectionTitles: Record<Exclude<TaskSection, never>, string> = {
  today: 'Hoy',
  upcoming: 'Próximos',
  completed: 'Completados',
};

export function PendingPage() {
  const { tasks, toggleTask, addTask, updateTask } = useVeloraStore();
  const [filter, setFilter] = useState<Filter>('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openTaskForm) {
      setEditingTask(null);
      setFormOpen(true);
    }
  }, [location.state]);

  const visibleSections = useMemo(() => {
    if (filter === 'all') return allSections;
    return allSections.filter((s) => s === filter);
  }, [filter]);

  const tasksBySection = useMemo(() => {
    const map: Record<TaskSection, TaskItem[]> = {
      today: [],
      upcoming: [],
      completed: [],
    };
    for (const task of tasks) {
      if (map[task.section]) {
        map[task.section].push(task);
      }
    }
    return map;
  }, [tasks]);

  const handleEdit = (task: TaskItem) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleSubmit = (data: { title: string; notes?: string; priority: TaskPriority; dueDate: string }) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
    setEditingTask(null);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="px-4 sm:px-6 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-ink">Pendientes</h1>
          <button
            onClick={() => {
              setEditingTask(null);
              setFormOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-petroleum-700 text-white text-sm font-medium hover:bg-petroleum-800 transition-colors touch-target"
          >
            <CheckSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Nueva tarea</span>
            <span className="sm:hidden">Nueva</span>
          </button>
        </div>
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'Todas' },
            { value: 'today', label: 'Hoy' },
            { value: 'upcoming', label: 'Próximos' },
            { value: 'completed', label: 'Completadas' },
          ]}
        />
      </div>

      <div className="pt-4 space-y-6">
        {visibleSections.map((section) => {
          const sectionTasks = tasksBySection[section];
          if (sectionTasks.length === 0) return null;

          return (
            <section key={section}>
              <div className="px-4 sm:px-6 pb-2">
                <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
                  {sectionTitles[section]}
                </h2>
              </div>
              <ul className="divide-y divide-gray-50">
                {sectionTasks.map((task) => {
                  const overdue = !task.completed && isOverdue(task.dueDate);
                  const today = isToday(task.dueDate);

                  return (
                    <li
                      key={task.id}
                      className="flex items-start gap-3 px-4 sm:px-6 py-3 hover:bg-gray-50/50 transition-colors"
                    >
                      <button
                        onClick={() => toggleTask(task.id)}
                        aria-label={
                          task.completed
                            ? `Marcar "${task.title}" como pendiente`
                            : `Marcar "${task.title}" como completada`
                        }
                        className="mt-0.5 shrink-0 touch-target flex items-center justify-center"
                      >
                        {task.completed ? (
                          <span className="w-5 h-5 rounded-md bg-success-500 flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-md border-2 border-gray-300 hover:border-teal-500 transition-colors" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            className={`text-sm font-semibold leading-snug ${
                              task.completed
                                ? 'text-ink-subtle line-through'
                                : 'text-ink'
                            }`}
                          >
                            {task.title}
                          </h3>
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${priorityDots[task.priority]}`}
                            aria-label={`Prioridad ${priorityLabels[task.priority]}`}
                            title={`Prioridad ${priorityLabels[task.priority]}`}
                          />
                        </div>
                        {task.notes && (
                          <p className="text-sm text-ink-muted mt-0.5 line-clamp-2">
                            {task.notes}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1.5">
                          <span
                            className={`flex items-center gap-1 text-xs ${
                              overdue
                                ? 'text-danger-600 font-medium'
                                : today
                                ? 'text-warning-600 font-medium'
                                : 'text-ink-subtle'
                            }`}
                          >
                            {overdue && <AlertCircle className="w-3.5 h-3.5" />}
                            {formatDate(task.dueDate)}
                          </span>
                          <span className="text-xs text-ink-subtle">·</span>
                          <span className="text-xs text-ink-subtle">
                            {priorityLabels[task.priority]}
                          </span>
                          {!task.completed && (
                            <>
                              <span className="text-xs text-ink-subtle">·</span>
                              <button
                                onClick={() => handleEdit(task)}
                                className="text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors"
                              >
                                Editar
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}

        {filter === 'all' && tasks.length === 0 && (
          <EmptyState
            icon={Inbox}
            title="No hay tareas pendientes"
            description="Crea una nueva tarea para empezar a organizar tu trabajo."
          />
        )}
        {filter !== 'all' && tasksBySection[filter as TaskSection]?.length === 0 && (
          <EmptyState
            icon={Inbox}
            title={`No hay tareas en ${sectionTitles[filter as TaskSection]}`}
            description="Las tareas que crees aparecerán aquí según su fecha."
          />
        )}
      </div>

      <TaskForm
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        editingTask={editingTask}
      />
    </div>
  );
}

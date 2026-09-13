import { useCallback, useState } from 'react';
import type { ActivityItem, DocItem, TaskItem, SyncState } from '@/types';
import { demoActivities, demoDocuments, demoTasks } from '@/data/demo';

interface VeloraState {
  activities: ActivityItem[];
  documents: DocItem[];
  tasks: TaskItem[];
  syncState: SyncState;
}

const initialState: VeloraState = {
  activities: demoActivities,
  documents: demoDocuments,
  tasks: demoTasks,
  syncState: 'idle',
};

let globalState: VeloraState = { ...initialState };

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function setState(updater: (prev: VeloraState) => VeloraState) {
  globalState = updater(globalState);
  notify();
}

export function useVeloraStore() {
  const [, forceRender] = useState(0);

  const subscribe = useCallback(() => {
    const listener = () => forceRender((n) => n + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // Subscribe on mount
  useState(() => {
    subscribe();
    return undefined;
  });

  const triggerSync = useCallback(() => {
    setState((prev) => ({ ...prev, syncState: 'syncing' }));
    setTimeout(() => {
      setState((prev) => ({ ...prev, syncState: 'synced' }));
      setTimeout(() => {
        setState((prev) => ({ ...prev, syncState: 'idle' }));
      }, 2000);
    }, 900);
  }, []);

  const addTask = useCallback((task: Omit<TaskItem, 'id' | 'completed' | 'section'>) => {
    const newTask: TaskItem = {
      ...task,
      id: `t-${Date.now()}`,
      completed: false,
      section: 'today',
    };
    setState((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
      activities: [
        {
          id: `a-${Date.now()}`,
          type: 'task_created',
          title: task.title,
          detail: task.notes ?? 'Nueva tarea',
          timestamp: new Date().toISOString(),
          status: 'pending',
        },
        ...prev.activities,
      ],
    }));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => {
        if (t.id !== id) return t;
        const completed = !t.completed;
        return {
          ...t,
          completed,
          section: completed ? 'completed' : t.dueDate < new Date().toISOString().slice(0, 10) ? 'today' : 'today',
        };
      }),
    }));
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<TaskItem>) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== id),
    }));
  }, []);

  const addDocument = useCallback((doc: Omit<DocItem, 'id'>) => {
    const newDoc: DocItem = {
      ...doc,
      id: `d-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      documents: [newDoc, ...prev.documents],
      activities: [
        {
          id: `a-${Date.now()}`,
          type: 'document_added',
          title: doc.name,
          detail: `${doc.category} · ${doc.size}`,
          timestamp: new Date().toISOString(),
          status: 'info',
        },
        ...prev.activities,
      ],
    }));
  }, []);

  return {
    activities: globalState.activities,
    documents: globalState.documents,
    tasks: globalState.tasks,
    syncState: globalState.syncState,
    triggerSync,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    addDocument,
  };
}

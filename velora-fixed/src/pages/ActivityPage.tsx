import { useMemo } from 'react';
import { useVeloraStore } from '@/store/useStore';
import { SummaryStrip } from '@/components/activity/SummaryStrip';
import { ActivityList } from '@/components/activity/ActivityList';
import { isToday } from '@/lib/format';

export function ActivityPage() {
  const { activities, tasks } = useVeloraStore();

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const documentCount = activities.filter((a) => a.type === 'document_added').length;
  const reminderCount = tasks.filter(
    (t) => !t.completed && isToday(t.dueDate)
  ).length;

  const sortedActivities = useMemo(
    () =>
      [...activities].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    [activities]
  );

  return (
    <div className="animate-fade-in">
      <SummaryStrip
        pendingCount={pendingCount}
        documentCount={documentCount}
        reminderCount={reminderCount}
      />
      <div className="px-4 sm:px-6 pt-5 pb-2">
        <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
          Actividad reciente
        </h2>
      </div>
      <ActivityList items={sortedActivities} />
    </div>
  );
}

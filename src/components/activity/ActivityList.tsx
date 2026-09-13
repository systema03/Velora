import { ActivityRow } from './ActivityRow';
import { EmptyState } from '@/components/ui/EmptyState';
import { Activity as ActivityIcon } from 'lucide-react';
import type { ActivityItem } from '@/types';

interface ActivityListProps {
  items: ActivityItem[];
}

export function ActivityList({ items }: ActivityListProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={ActivityIcon}
        title="Sin actividad reciente"
        description="Las acciones que realices aparecerán aquí en orden cronológico."
      />
    );
  }

  return (
    <ul className="divide-y divide-gray-50">
      {items.map((item) => (
        <ActivityRow key={item.id} item={item} />
      ))}
    </ul>
  );
}

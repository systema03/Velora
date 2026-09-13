export type ActivityType =
  | 'document_added'
  | 'task_created'
  | 'task_updated'
  | 'task_completed'
  | 'reminder_upcoming'
  | 'receipt_registered';

export type ActivityStatus = 'done' | 'pending' | 'overdue' | 'info';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  detail: string;
  timestamp: string;
  status: ActivityStatus;
}

export type DocCategory = 'contract' | 'invoice' | 'report' | 'receipt' | 'other';

export type DocKind = 'document' | 'receipt';

export interface DocItem {
  id: string;
  name: string;
  category: DocCategory;
  kind: DocKind;
  date: string;
  size: string;
  amount?: number;
  description?: string;
}

export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskSection = 'today' | 'upcoming' | 'completed';

export interface TaskItem {
  id: string;
  title: string;
  notes?: string;
  priority: TaskPriority;
  dueDate: string;
  completed: boolean;
  section: TaskSection;
}

export type ReminderItem = TaskItem;

export type SyncState = 'idle' | 'syncing' | 'synced';

export type ThemePreference = 'light' | 'dark' | 'system';

export type DateFormatPreference = 'dmy' | 'mdy' | 'ymd';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'To Do' | 'In Progress' | 'Done' | 'Timeout';
  priority: 'Low' | 'Medium' | 'High';
  isCompleted: boolean;
  createdAt: string;
  dueDate?: string | null;
}

export type TaskFormData = Omit<Task, 'id' | 'isCompleted' | 'createdAt'>;

export const CATEGORIES: Task['category'][] = ['To Do', 'In Progress', 'Done', 'Timeout'];
export const PRIORITIES: Task['priority'][] = ['Low', 'Medium', 'High'];

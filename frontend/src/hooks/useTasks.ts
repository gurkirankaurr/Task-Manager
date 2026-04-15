import { useState, useEffect, useCallback } from 'react';
import { Task, TaskFormData } from '../types';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (data: TaskFormData) => Promise<void>;
  editTask: (id: string, updates: Partial<Task>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  toggleComplete: (task: Task) => Promise<void>;
  refreshTasks: () => void;
}

const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (data: TaskFormData) => {
    try {
      const newTask = await createTask(data);
      setTasks((prev) => [...prev, newTask]);
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
      throw err;
    }
  };

  const editTask = async (id: string, updates: Partial<Task>) => {
    try {
      const updated = await updateTask(id, updates);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
      throw err;
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
      throw err;
    }
  };

  const toggleComplete = async (task: Task) => {
    await editTask(task.id, { isCompleted: !task.isCompleted });
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    toggleComplete,
    refreshTasks: fetchTasks,
  };
};

export default useTasks;

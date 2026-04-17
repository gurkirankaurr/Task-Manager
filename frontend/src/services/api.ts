import axios, { AxiosError } from 'axios';
import { Task, TaskFormData } from '../types';

// In production (Vercel), set REACT_APP_API_URL to your Railway backend URL.
// In local dev, falls back to localhost:5000.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axios instance with base config
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
});

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error?: string }>) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const getTasks = async (category?: string): Promise<Task[]> => {
  const params = category ? { category } : {};
  const response = await api.get<Task[]>('/tasks', { params });
  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: TaskFormData): Promise<Task> => {
  const response = await api.post<Task>('/tasks', task);
  return response.data;
};

export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  const response = await api.put<Task>(`/tasks/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

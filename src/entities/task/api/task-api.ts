import { apiClient } from '@/shared/api';
import { Task } from '../model/types';

export const taskApi = {
  getTasks: (programId: string) => apiClient.request<Task[]>(`/tasks?programId=${programId}`),
  getTask: (id: string) => apiClient.request<Task>(`/tasks/${id}`),
  createTask: (data: Partial<Task>) => apiClient.request<Task>('/tasks', { method: 'POST', body: JSON.stringify(data) }),
  updateTask: (id: string, data: Partial<Task>) => apiClient.request<Task>(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTask: (id: string) => apiClient.request<void>(`/tasks/${id}`, { method: 'DELETE' }),
};

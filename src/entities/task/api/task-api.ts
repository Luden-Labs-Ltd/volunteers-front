import { apiClient } from '@/shared/api';
import {
  Task,
  TaskResponse,
  CreateTaskDto,
  UpdateTaskDto,
  ApproveTaskDto,
  AssignVolunteerDto,
  ApproveVolunteerDto,
  TaskStatus,
} from '../model/types';
import { validateApiResponse, isArray, isObject, validateRequiredFields, isValidUUID } from '@/shared/lib/validation';

interface GetTasksParams {
  programId?: string;
  status?: TaskStatus;
  categoryId?: string;
  skillIds?: string | string[];
  cityId?: string;
}

export const taskApi = {
  getTasks: async (params?: GetTasksParams): Promise<Task[]> => {
    // Валидация параметров
    if (params?.programId && !isValidUUID(params.programId)) {
      throw new Error('Invalid programId format');
    }
    if (params?.categoryId && !isValidUUID(params.categoryId)) {
      throw new Error('Invalid categoryId format');
    }
    if (params?.skillIds) {
      const skillIdsArray = Array.isArray(params.skillIds) ? params.skillIds : [params.skillIds];
      if (!skillIdsArray.every(id => isValidUUID(id))) {
        throw new Error('Invalid skillIds format');
      }
    }
    if (params?.cityId && !isValidUUID(params.cityId)) {
      throw new Error('Invalid cityId format');
    }
    
    const queryParams = new URLSearchParams();
    if (params?.programId) queryParams.append('programId', params.programId);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.categoryId) queryParams.append('categoryId', params.categoryId);
    if (params?.skillIds) {
      const skillIdsArray = Array.isArray(params.skillIds) ? params.skillIds : [params.skillIds];
      skillIdsArray.forEach((id) => queryParams.append('skillIds', id));
    }
    if (params?.cityId) queryParams.append('cityId', params.cityId);
    const queryString = queryParams.toString();
    const response = await apiClient.request<Task[]>(`/tasks${queryString ? `?${queryString}` : ''}`);
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is Task[] => isArray(data),
      'Invalid tasks response format'
    );
  },

  getTask: async (id: string): Promise<Task> => {
    if (!id || !isValidUUID(id)) {
      throw new Error('Invalid task ID format');
    }
    const response = await apiClient.request<Task>(`/tasks/${id}`);
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is Task => {
        return isObject(data) && 
               validateRequiredFields(data, ['id', 'programId', 'needyId', 'type', 'title', 'description', 'status']);
      },
      'Invalid task response format'
    );
  },

  getMyTasks: async (): Promise<Task[]> => {
    const response = await apiClient.request<Task[]>('/tasks/my');
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is Task[] => isArray(data),
      'Invalid my tasks response format'
    );
  },

  getAssignedTasks: async (): Promise<Task[]> => {
    const response = await apiClient.request<Task[]>('/tasks/assigned');
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is Task[] => isArray(data),
      'Invalid assigned tasks response format'
    );
  },

  createTask: async (data: CreateTaskDto): Promise<Task> => {
    // Валидация входных данных
    if (!data.programId || !isValidUUID(data.programId)) {
      throw new Error('Invalid programId format');
    }
    if (!data.needyId || !isValidUUID(data.needyId)) {
      throw new Error('Invalid needyId format');
    }
    if (!data.title || !data.description) {
      throw new Error('Title and description are required');
    }
    
    const response = await apiClient.request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is Task => {
        return isObject(data) && 
               validateRequiredFields(data, ['id', 'programId', 'needyId', 'title', 'description', 'status']);
      },
      'Invalid create task response format'
    );
  },

  updateTask: async (id: string, data: UpdateTaskDto): Promise<Task> => {
    if (!id || !isValidUUID(id)) {
      throw new Error('Invalid task ID format');
    }
    
    const response = await apiClient.request<Task>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is Task => {
        return isObject(data) && 
               validateRequiredFields(data, ['id', 'status']);
      },
      'Invalid update task response format'
    );
  },

  deleteTask: async (id: string): Promise<void> => {
    if (!id || !isValidUUID(id)) {
      throw new Error('Invalid task ID format');
    }
    await apiClient.request<void>(`/tasks/${id}`, { method: 'DELETE' });
  },

  assignVolunteer: async (id: string, data: AssignVolunteerDto): Promise<Task> => {
    if (!id) {
      throw new Error('Task ID is required');
    }
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format: data must be an object');
    }
    if (!data.volunteerId) {
      throw new Error('volunteerId is required');
    }
    
    const response = await apiClient.request<Task>(`/tasks/${id}/assign`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is Task => {
        return isObject(data) && 
               validateRequiredFields(data, ['id', 'status']);
      },
      'Invalid assign volunteer response format'
    );
  },

  cancelAssignment: async (id: string): Promise<Task> => {
    if (!id || !isValidUUID(id)) {
      throw new Error('Invalid task ID format');
    }
    
    const response = await apiClient.request<Task>(`/tasks/${id}/cancel-assignment`, {
      method: 'POST',
    });
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is Task => {
        return isObject(data) && 
               validateRequiredFields(data, ['id', 'status']);
      },
      'Invalid cancel assignment response format'
    );
  },

  approveCompletion: async (id: string, data: ApproveTaskDto): Promise<Task> => {
    if (!id || !isValidUUID(id)) {
      throw new Error('Invalid task ID format');
    }
    if (!data.role) {
      throw new Error('Role is required');
    }
    
    const response = await apiClient.request<Task>(`/tasks/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is Task => {
        return isObject(data) && 
               validateRequiredFields(data, ['id', 'status']);
      },
      'Invalid approve completion response format'
    );
  },
};

export const taskResponseApi = {
  respond: async (taskId: string): Promise<TaskResponse> => {
    if (!taskId || !isValidUUID(taskId)) {
      throw new Error('Invalid task ID format');
    }
    
    const response = await apiClient.request<TaskResponse>(`/task-responses/task/${taskId}/respond`, {
      method: 'POST',
    });
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is TaskResponse => {
        return isObject(data) && 
               validateRequiredFields(data, ['id', 'taskId', 'volunteerId', 'status']);
      },
      'Invalid task response format'
    );
  },

  cancelResponse: async (taskId: string): Promise<void> => {
    if (!taskId || !isValidUUID(taskId)) {
      throw new Error('Invalid task ID format');
    }
    await apiClient.request<void>(`/task-responses/task/${taskId}/respond`, {
      method: 'DELETE',
    });
  },

  getByTaskId: async (taskId: string): Promise<TaskResponse[]> => {
    if (!taskId || !isValidUUID(taskId)) {
      throw new Error('Invalid task ID format');
    }
    
    const response = await apiClient.request<TaskResponse[]>(`/task-responses/task/${taskId}`);
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is TaskResponse[] => isArray(data),
      'Invalid task responses response format'
    );
  },

  approveVolunteer: async (taskId: string, data: ApproveVolunteerDto): Promise<TaskResponse> => {
    if (!taskId || !isValidUUID(taskId)) {
      throw new Error('Invalid task ID format');
    }
    if (!data.volunteerId || !isValidUUID(data.volunteerId)) {
      throw new Error('Invalid volunteerId format');
    }
    
    const response = await apiClient.request<TaskResponse>(`/task-responses/task/${taskId}/approve`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is TaskResponse => {
        return isObject(data) && 
               validateRequiredFields(data, ['id', 'taskId', 'volunteerId', 'status']);
      },
      'Invalid approve volunteer response format'
    );
  },

  rejectVolunteer: async (taskId: string, data: ApproveVolunteerDto): Promise<TaskResponse> => {
    if (!taskId || !isValidUUID(taskId)) {
      throw new Error('Invalid task ID format');
    }
    if (!data.volunteerId || !isValidUUID(data.volunteerId)) {
      throw new Error('Invalid volunteerId format');
    }
    
    const response = await apiClient.request<TaskResponse>(`/task-responses/task/${taskId}/reject`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is TaskResponse => {
        return isObject(data) && 
               validateRequiredFields(data, ['id', 'taskId', 'volunteerId', 'status']);
      },
      'Invalid reject volunteer response format'
    );
  },

  getByVolunteerId: async (volunteerId: string): Promise<TaskResponse[]> => {
    if (!volunteerId || !isValidUUID(volunteerId)) {
      throw new Error('Invalid volunteer ID format');
    }
    
    const response = await apiClient.request<TaskResponse[]>(`/task-responses/volunteer/${volunteerId}`);
    
    // Валидация ответа
    return validateApiResponse(
      response,
      (data): data is TaskResponse[] => isArray(data),
      'Invalid volunteer responses response format'
    );
  },
};

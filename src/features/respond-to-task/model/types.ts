export interface TaskResponse {
  id: string;
  taskId: string;
  volunteerId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export enum PointsTransactionType {
  TASK_COMPLETION = 'task_completion',
  MANUAL_ADJUSTMENT = 'manual_adjustment',
  REFUND = 'refund',
}

export enum PointsTransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface PointsTransaction {
  id: string;
  volunteerId: string;
  taskId?: string;
  task?: {
    id: string;
    title: string;
    points: number;
  };
  amount: number;
  type: PointsTransactionType;
  status: PointsTransactionStatus;
  description?: string;
  balanceBefore: number;
  balanceAfter: number;
  createdAt: string;
}

export interface PointsBalance {
  balance: number;
}

export interface PointsTransactionsResponse {
  transactions: PointsTransaction[];
  total: number;
}

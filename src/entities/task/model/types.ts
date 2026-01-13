export interface Task {
  id: string;
  programId: string;
  needyId: string;
  type: string;
  title: string;
  description: string;
  details: string;
  points: number;
  status: 'active' | 'in_progress' | 'completed' | 'cancelled';
  cityId: string;
  address: string;
  firstResponseMode: boolean;
  assignedVolunteerId: string | null;
  completedByVolunteer: boolean;
  completedByNeedy: boolean;
  createdAt: Date;
  updatedAt: Date;
}

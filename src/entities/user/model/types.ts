export type UserRole = 'volunteer' | 'needy' | 'admin';
export type UserStatus = 'pending' | 'approved' | 'blocked';

export interface User {
  id: string;
  phone: string | null;
  email: string | null;
  role: UserRole;
  status: UserStatus;
  firstName: string;
  lastName: string;
  photo: string;
  about: string;
  programId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

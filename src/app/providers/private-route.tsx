import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetMe } from '@/entities/user/model/hooks';
import { UserRole } from '@/entities/user/model/types';
import { RoleGuard } from '@/shared/lib/auth';

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = '/auth',
}) => {
  const { data: user, isLoading } = useGetMe();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      {children}
    </RoleGuard>
  );
};

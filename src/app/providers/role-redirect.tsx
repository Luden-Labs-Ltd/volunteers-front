import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetMe } from '@/entities/user/model/hooks';
import { UserRole } from '@/entities/user/model/types';

const roleRoutes: Record<UserRole, string> = {
    volunteer: '/volunteer',
    needy: '/needy',
    admin: '/admin',
};

export const RoleRedirect: FC = () => {
    const { data: user, isLoading } = useGetMe();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    const redirectPath = roleRoutes[user.role] || '/auth';
    return <Navigate to={redirectPath} replace />;
};

import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { PrivateRoute } from './private-route';
import { UserRole } from '@/entities/user/model/types';

interface ProtectedLayoutProps {
    allowedRoles: UserRole[];
}

export const ProtectedLayout: FC<ProtectedLayoutProps> = ({
    allowedRoles,
}) => {
    return (
        <PrivateRoute allowedRoles={allowedRoles}>
            <Outlet />
        </PrivateRoute>
    );
};

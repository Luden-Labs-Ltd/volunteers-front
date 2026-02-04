import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetMe } from '@/entities/user/model/hooks';
import { UserRole } from '@/entities/user/model/types';
import { RoleGuard } from '@/shared/lib/auth';
import { onboardingStorage } from "@/shared/lib/onboarding";

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
    const location = useLocation();

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
    if (user.role === 'volunteer') {
        const isLocalCompleted = onboardingStorage.isCompleted();
        const isBackendCompleted = Boolean(user.firstName && user.lastName);
        const isActuallyCompleted = isLocalCompleted || isBackendCompleted;
        if (isBackendCompleted && !isLocalCompleted) {
            onboardingStorage.setCompleted();
        }
        const isOnboardingPage = location.pathname === '/volunteer/onboarding';
        if (!isActuallyCompleted && !isOnboardingPage) {
            return <Navigate to="/volunteer/onboarding" replace />;
        }
        if (isActuallyCompleted && isOnboardingPage) {
            return <Navigate to="/volunteer" replace />;
        }
    }

    return (
        <RoleGuard allowedRoles={allowedRoles}>
            {children}
        </RoleGuard>
    );
};

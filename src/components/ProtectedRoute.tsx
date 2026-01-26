import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    // Verificar usuario y token desde Redux (fuente de verdad única)
    const user = useSelector((state: any) => state.user);

    // Si no hay usuario o token, redirigir al login
    if (!user || !user.id || !user.token) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;


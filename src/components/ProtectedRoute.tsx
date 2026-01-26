import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
    // Lista opcional de roles permitidos (ej: ['ADMIN','MANAGER'])
    allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    // Verificar usuario y token desde Redux (fuente de verdad única)
    const user = useSelector((state: any) => state.user);

    // Si no hay usuario o token, redirigir al login
    if (!user || !user.id || !user.token) {
        return <Navigate to="/" replace />;
    }

    // Si se especificaron roles y el rol del usuario no está en la lista, negar acceso
    if (allowedRoles && allowedRoles.length > 0) {
        const userRole = (user.role || '').toString();
        const allowed = allowedRoles.some(r => r.toUpperCase() === userRole.toUpperCase());
        if (!allowed) {
            return <Navigate to="/home" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;


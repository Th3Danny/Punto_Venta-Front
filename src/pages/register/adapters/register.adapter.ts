import type { BackendAuthResponse } from '@/services/auth.service';
import type { User } from '@/models';

// Función para decodificar JWT (sin verificar firma, solo para leer datos)
const decodeJWT = (token: string): any => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
};

export const registerAdapter = (backendResponse: BackendAuthResponse): User => {
    const token = backendResponse.data.access_token;
    const decodedToken = decodeJWT(token);

    // Extraer información del token JWT
    const email = decodedToken?.email || decodedToken?.sub || '';
    const role = decodedToken?.roles?.[0] || 'user';
    const userId = backendResponse.data.id_user;

    return {
        id: userId,
        name: email.split('@')[0] || `User ${userId}`, // Usa la parte antes del @ como nombre
        email: email,
        token: token,
        role: role
    };
};


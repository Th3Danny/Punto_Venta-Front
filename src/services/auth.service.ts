import { loadAbort } from '@/utils';
import type { AxiosCall } from '@/models';
import apiAxiosInstance from './api.service';

// Interfaces para auth (pueden moverse a models globales si se prefiere)
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}

// Respuesta real del backend
export interface BackendAuthResponse {
    data: {
        id_user: number;
        access_token: string;
        refresh_token: string;
    };
    message: string;
    success: boolean;
    httpStatus: string;
}

// Interfaz interna para el adapter
export interface AuthResponse {
    user: {
        id: number;
        email: string;
        username: string;
        role?: string;
    };
    token: string;
}

// Servicio de Login (global)
export const loginService = (credentials: LoginCredentials): AxiosCall<BackendAuthResponse> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.post<BackendAuthResponse>('/auth/authenticate', credentials, {
            signal: controller.signal
        }),
        controller
    };
};

// Servicio de Register (global)
export const registerService = (credentials: RegisterCredentials): AxiosCall<BackendAuthResponse> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.post<BackendAuthResponse>('/auth/register', credentials, {
            signal: controller.signal
        }),
        controller
    };
};


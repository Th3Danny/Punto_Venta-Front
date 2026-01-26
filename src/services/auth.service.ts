import { loadAbort } from '@/utils';
import type { AxiosCall, LoginCredentials, RegisterCredentials, BackendAuthResponse } from '@/models';
import apiAxiosInstance from './api.service';



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


// Modelos de autenticación

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

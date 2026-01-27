import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';
import { store } from '@/redux/store';
import { resetUser } from '@/redux/states/user';
import { API_CONFIG } from '@/config/api.config';

// Crear instancia de axios global para todas las peticiones autenticadas
const apiAxiosInstance: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS
});

// Interceptor de request - Agrega el token automáticamente desde Redux
apiAxiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Obtener token del store de Redux (fuente de verdad única)
        const state = store.getState();
        const token = state.user?.token;

        // Si hay token, agregarlo al header
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Interceptor de response - Maneja errores de autenticación
apiAxiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        // Si el error es 401 (No autorizado), limpiar sesión
        if (error.response?.status === 401) {
            // Limpiar usuario de Redux (esto también limpia localStorage automáticamente)
            store.dispatch(resetUser());
            // Redirigir al login si no estamos ya ahí
            if (window.location.pathname !== '/' && window.location.pathname !== '/register') {
                window.location.href = '/';
            }
        }

        // Manejo de otros errores
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data as any;

            switch (status) {
                case 403:
                    error.message = data?.message || 'No tienes permisos para realizar esta acción';
                    break;
                case 404:
                    error.message = data?.message || 'Recurso no encontrado';
                    break;
                case 500:
                    error.message = data?.message || 'Error del servidor';
                    break;
                default:
                    error.message = data?.message || 'Error en la petición';
            }
        } else if (error.request) {
            error.message = 'No se pudo conectar con el servidor';
        } else {
            error.message = 'Error al procesar la solicitud';
        }

        return Promise.reject(error);
    }
);

export default apiAxiosInstance;


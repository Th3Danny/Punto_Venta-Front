import type { SaleRequest, AxiosCall } from '@/models';
import { loadAbort } from '@/utils';
import apiAxiosInstance from './api.service';

// Crear una nueva venta
export const createSale = (saleData: SaleRequest): AxiosCall<any> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.post('/sales', saleData, {
            signal: controller.signal
            // El token de autenticación se agregará automáticamente por el interceptor global
        }),
        controller
    };
};

// Obtener historial de ventas (para futuras funcionalidades)
export const getSales = (): AxiosCall<any[]> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get('/sales', {
            signal: controller.signal
        }),
        controller
    };
};

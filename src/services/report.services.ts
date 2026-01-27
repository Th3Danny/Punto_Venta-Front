import type { AxiosCall, BackendSalesResponse } from '@/models';
import { loadAbort } from '@/utils';
import apiAxiosInstance from './api.service';

/**
 * Servicio para obtener reportes de ventas
 * Si el backend no tiene endpoints específicos de reportes,
 * usamos el listado general de ventas y procesamos en el frontend.
 */

// Obtener todas las ventas para reportes
export const getAllSales = (): AxiosCall<BackendSalesResponse> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get<BackendSalesResponse>('/sales', {
            signal: controller.signal
        }),
        controller
    };
};

// Obtener ventas en un rango de fechas (asumiendo que el backend lo soporta)
export const getSalesByRange = (startDate: string, endDate: string): AxiosCall<BackendSalesResponse> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get<BackendSalesResponse>('/sales/range', {
            params: { startDate, endDate },
            signal: controller.signal
        }),
        controller
    };
};

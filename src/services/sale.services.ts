import type { SaleRequest, AxiosCall } from '@/models';
import { loadAbort } from '@/utils';
import apiAxiosInstance from './api.service';

// Crear una nueva venta
export const createSale = (saleData: SaleRequest): AxiosCall<any> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.post('/sales', saleData, {
            signal: controller.signal

        }),
        controller
    };
};

// Obtener historial de ventas por rango de fechas
export const getSalesReport = (from: string, to: string): AxiosCall<any> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get('/sales/reports/sales', {
            params: { from, to },
            signal: controller.signal
        }),
        controller
    };
};

// Obtener los productos más vendidos
export const getTopProducts = (from: string, to: string, limit: number = 3): AxiosCall<any> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get('/sales/reports/top-products', {
            params: { from, to, limit },
            signal: controller.signal
        }),
        controller
    };
};

// Obtener reporte de ventas diarias para gráficas
export const getDailySales = (from: string, to: string): AxiosCall<any> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get('/sales/reports/daily-sales', {
            params: { from, to },
            signal: controller.signal
        }),
        controller
    };
};

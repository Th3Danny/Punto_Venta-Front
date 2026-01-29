import type { AxiosCall, BackendSalesResponse } from '@/models';
import { loadAbort } from '@/utils';
import apiAxiosInstance from './api.service';



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

// Obtener ventas en un rango de fechas
export const getSalesByRange = (from: string, to: string): AxiosCall<BackendSalesResponse> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get<BackendSalesResponse>('/sales/reports/sales', {
            params: { from, to },
            signal: controller.signal
        }),
        controller
    };
};

// Obtener los productos más vendidos en un rango de fechas
export const getTopProductsByRange = (from: string, to: string, limit: number = 3): AxiosCall<any> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get<any>('/sales/reports/top-products', {
            params: { from, to, limit },
            signal: controller.signal
        }),
        controller
    };
};

// Obtener reporte de ventas diarias en un rango de fechas
export const getDailySalesReport = (from: string, to: string): AxiosCall<any> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get<any>('/sales/reports/daily-sales', {
            params: { from, to },
            signal: controller.signal
        }),
        controller
    };
};

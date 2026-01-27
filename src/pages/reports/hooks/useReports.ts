import { useState, useCallback, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useFetchAndLoad } from '@/hooks';
import { getAllSales } from '@/services/report.services';
import type { SaleResponse } from '@/models';
import axios from 'axios';

export const useReports = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const { enqueueSnackbar } = useSnackbar();
    const [sales, setSales] = useState<SaleResponse[]>([]);

    const loadReports = useCallback(async () => {
        try {
            const response = await callEndpoint(getAllSales());
            const responseData = response.data;
            if (responseData.success) {
                setSales(responseData.data || []);
                // Opcional: enqueueSnackbar(responseData.message, { variant: 'success' });
            }
        } catch (error: any) {
            if (axios.isCancel(error)) return;
            enqueueSnackbar('Error al cargar datos de reportes', { variant: 'error' });
        }
    }, [callEndpoint, enqueueSnackbar]);

    // Calcular productos más vendidos
    const topProducts = useMemo(() => {
        const counts: Record<string, { name: string, quantity: number }> = {};

        sales.forEach(sale => {
            sale.details.forEach(detail => {
                if (!counts[detail.productId]) {
                    counts[detail.productId] = { name: detail.productName, quantity: 0 };
                }
                counts[detail.productId].quantity += detail.amount;
            });
        });

        return Object.values(counts)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5); // Retornar los top 5
    }, [sales]);

    // Formatear datos para la gráfica (Ventas por día)
    const salesChartData = useMemo(() => {
        const dailySales: Record<string, number> = {};

        sales.forEach(sale => {
            // Extraer solo la fecha YYYY-MM-DD
            const date = sale.date.split('T')[0];
            dailySales[date] = (dailySales[date] || 0) + Number(sale.total);
        });

        return Object.entries(dailySales)
            .map(([date, total]) => ({ date, total }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }, [sales]);

    return {
        sales,
        topProducts,
        salesChartData,
        loading,
        loadReports
    };
};

import { useState, useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useFetchAndLoad } from '@/hooks';
import { getSalesByRange, getTopProductsByRange, getDailySalesReport } from '@/services/report.services';
import type { SaleResponse, TopProduct, ChartData } from '@/models';
import axios from 'axios';
import { topProductAdapter, dailyChartAdapter } from '@/adapters/reports';

export const useReports = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const { enqueueSnackbar } = useSnackbar();

    const [sales, setSales] = useState<SaleResponse[]>([]);
    const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
    const [salesChartData, setSalesChartData] = useState<ChartData[]>([]);

    // Rango por defecto: últimos 30 días
    const [dateRange, setDateRange] = useState({
        from: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0]
    });

    const loadReports = useCallback(async () => {
        try {
            const [salesRes, topRes, chartRes] = await Promise.all([
                callEndpoint(getSalesByRange(dateRange.from, dateRange.to)),
                callEndpoint(getTopProductsByRange(dateRange.from, dateRange.to, 3)),
                callEndpoint(getDailySalesReport(dateRange.from, dateRange.to))
            ]);

            if (salesRes.data.success) setSales(salesRes.data.data || []);
            if (topRes.data.success) {
                const formattedTop = (topRes.data.data || []).map((item: any) => topProductAdapter(item));
                setTopProducts(formattedTop);
            }
            if (chartRes.data.success) {
                const formattedChart = (chartRes.data.data || []).map((item: any) => dailyChartAdapter(item));
                setSalesChartData(formattedChart);
            }

        } catch (error: any) {
            if (axios.isCancel(error)) return;
            enqueueSnackbar('Error al cargar datos de reportes', { variant: 'error' });
        }
    }, [callEndpoint, enqueueSnackbar, dateRange]);

    useEffect(() => {
        loadReports();
    }, [loadReports]);

    const handleDateChange = (from: string, to: string) => {
        setDateRange({ from, to });
    };

    return {
        sales,
        topProducts,
        salesChartData,
        loading,
        dateRange,
        loadReports,
        handleDateChange
    };
};

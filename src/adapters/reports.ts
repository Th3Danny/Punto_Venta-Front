import type { TopProduct, ChartData } from '@/models';

export const topProductAdapter = (report: any): TopProduct => ({
    productId: report.productId,
    name: report.productName,
    quantity: Number(report.quantity)
});

export const dailyChartAdapter = (item: any): ChartData => ({
    date: item.date,
    total: Number(item.total)
});
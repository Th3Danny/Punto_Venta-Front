import { topProductAdapter, dailyChartAdapter } from '@/adapters/reports';
import type { TopProduct, ChartData } from '@/models';

export const reportsTopProductAdapter = (item: any): TopProduct => {
    return topProductAdapter(item);
};

export const reportsDailyChartAdapter = (item: any): ChartData => {
    return dailyChartAdapter(item);
};

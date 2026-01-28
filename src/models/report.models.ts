export interface TopProduct {
    productId: number;
    name: string;
    quantity: number;
}

export interface TopProductsProps {
    products: TopProduct[];
}

export interface ChartData {
    date: string;
    total: number;
}

export interface SalesChartProps {
    data: ChartData[];
}

export interface ReportSummaryProps {
    totalSales: number;
    totalOrders: number;
    avgOrderValue: number;
}

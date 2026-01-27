import { Paper, Typography, Box } from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface ChartData {
    date: string;
    total: number;
}

interface SalesChartProps {
    data: ChartData[];
}

export const SalesChart = ({ data }: SalesChartProps) => {
    return (
        <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom color="primary">
                Evolución de Ventas
            </Typography>
            <Box sx={{ width: '100%', height: 300 }}>
                {data.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography color="text.secondary">No hay datos para mostrar la gráfica</Typography>
                    </Box>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip
                                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Venta']}
                                labelStyle={{ color: 'black' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#1976d2"
                                strokeWidth={3}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </Box>
        </Paper>
    );
};

export default SalesChart;

import type { SalesChartProps } from '@/models';
import { Paper, Typography, Box } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registrar componentes de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);



export const SalesChart = ({ data }: SalesChartProps) => {
    const chartData = {
        labels: data.map(d => d.date || ''),
        datasets: [
            {
                label: 'Ventas ($)',
                data: data.map(d => d.total || 0),
                fill: true,
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                borderColor: '#1976d2',
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#1976d2',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        return `Venta: $${Number(context.raw || 0).toFixed(2)}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: any) => `$${value}`
                }
            }
        }
    };

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
                    <Line data={chartData} options={options} />
                )}
            </Box>
        </Paper>
    );
};

export default SalesChart;

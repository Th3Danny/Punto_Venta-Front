import {
    Box,
    Typography,
    Container,
    Grid,
    Button,
    CircularProgress,
    Paper
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useReports } from './hooks/useReports';
import { ReportSummary, TopProducts, SalesChart } from './components';


const Reports = () => {
    const {
        sales,
        topProducts,
        salesChartData,
        loading,
        loadReports
    } = useReports();

    const totalRevenue = sales.reduce((sum, s) => sum + Number(s.total), 0);
    const avgTicket = sales.length > 0 ? totalRevenue / sales.length : 0;

    return (
        <Container maxWidth="xl" sx={{ py: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
                <Box>
                    <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                        Panel de Reportes
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Monitorea el rendimiento de Cafetería KFE en tiempo real.
                    </Typography>
                </Box>
                <Button
                    startIcon={<Refresh />}
                    variant="contained"
                    onClick={loadReports}
                    disabled={loading}
                    sx={{ borderRadius: 10 }}
                >
                    Actualizar Datos
                </Button>
            </Box>

            {loading && sales.length === 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 15 }}>
                    <CircularProgress size={60} thickness={4} />
                    <Typography variant="h6" sx={{ mt: 3, opacity: 0.7 }}>Analizando datos de ventas...</Typography>
                </Box>
            ) : (
                <Box sx={{ animation: 'fadeIn 0.5s ease' }}>
                    <ReportSummary
                        totalSales={totalRevenue}
                        totalOrders={sales.length}
                        avgOrderValue={avgTicket}
                    />

                    <Grid container spacing={4}>
                        <Grid item xs={12} lg={8}>
                            <Paper sx={{ p: 4, height: '100%' }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                                    Tendencia Diaria de Ventas
                                </Typography>
                                <SalesChart data={salesChartData} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Paper sx={{ p: 4, height: '100%' }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                                    Productos más Vendidos
                                </Typography>
                                <TopProducts products={topProducts} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

export default Reports;


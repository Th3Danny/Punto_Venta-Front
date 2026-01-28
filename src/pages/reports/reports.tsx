import {
    Box,
    Typography,
    Container,
    Grid,
    Button,
    CircularProgress,
    Divider
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
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Panel Gerencial
                </Typography>
                <Button
                    startIcon={<Refresh />}
                    variant="outlined"
                    onClick={loadReports}
                    disabled={loading}
                >
                    Refrescar
                </Button>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {loading && sales.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Cargando analíticas...</Typography>
                </Box>
            ) : (
                <>
                    <ReportSummary
                        totalSales={totalRevenue}
                        totalOrders={sales.length}
                        avgOrderValue={avgTicket}
                    />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <SalesChart data={salesChartData} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TopProducts products={topProducts} />
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default Reports;


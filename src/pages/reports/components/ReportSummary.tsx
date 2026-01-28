import { Grid, Paper, Typography, Box } from '@mui/material';
import { TrendingUp, ShoppingBag, Receipt } from '@mui/icons-material';
import type { ReportSummaryProps } from '@/models';


export const ReportSummary = ({ totalSales, totalOrders, avgOrderValue }: ReportSummaryProps) => {
    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', bgcolor: 'primary.light', color: 'white' }}>
                    <TrendingUp sx={{ fontSize: 40, mr: 2 }} />
                    <Box>
                        <Typography variant="subtitle2">Total Vendido</Typography>
                        <Typography variant="h5" fontWeight="bold">${totalSales.toFixed(2)}</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', bgcolor: 'success.light', color: 'white' }}>
                    <Receipt sx={{ fontSize: 40, mr: 2 }} />
                    <Box>
                        <Typography variant="subtitle2">Total de Ventas</Typography>
                        <Typography variant="h5" fontWeight="bold">{totalOrders}</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', bgcolor: 'info.light', color: 'white' }}>
                    <ShoppingBag sx={{ fontSize: 40, mr: 2 }} />
                    <Box>
                        <Typography variant="subtitle2">Ticket Promedio</Typography>
                        <Typography variant="h5" fontWeight="bold">${avgOrderValue.toFixed(2)}</Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ReportSummary;

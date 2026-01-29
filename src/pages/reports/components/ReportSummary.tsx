import { Grid, Paper, Typography, Box } from '@mui/material';
import { TrendingUp, ShoppingBag, Receipt } from '@mui/icons-material';
import type { ReportSummaryProps } from '@/models';


export const ReportSummary = ({ totalSales, totalOrders, avgOrderValue }: ReportSummaryProps) => {
    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
                <Paper sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #6f4e37 0%, #4e3629 100%)',
                    color: 'white'
                }}>
                    <TrendingUp sx={{ fontSize: 40, mr: 2, opacity: 0.8 }} />
                    <Box>
                        <Typography variant="overline" sx={{ opacity: 0.8, lineHeight: 1 }}>Ingresos Totales</Typography>
                        <Typography variant="h4" fontWeight="bold">${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #c2a07e 0%, #a68059 100%)',
                    color: 'white'
                }}>
                    <Receipt sx={{ fontSize: 40, mr: 2, opacity: 0.8 }} />
                    <Box>
                        <Typography variant="overline" sx={{ opacity: 0.8, lineHeight: 1 }}>Ventas Realizadas</Typography>
                        <Typography variant="h4" fontWeight="bold">{totalOrders}</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #d2b48c 0%, #c2a07e 100%)',
                    color: 'white'
                }}>
                    <ShoppingBag sx={{ fontSize: 40, mr: 2, opacity: 0.8 }} />
                    <Box>
                        <Typography variant="overline" sx={{ opacity: 0.8, lineHeight: 1 }}>Valor Promedio</Typography>
                        <Typography variant="h4" fontWeight="bold">${avgOrderValue.toFixed(2)}</Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ReportSummary;

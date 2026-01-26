import { Box, Typography } from '@mui/material';

const SalesDetails = () => (
  <Box sx={{ padding: 4 }}>
    <Typography variant="h4" gutterBottom>Detalles de Venta</Typography>
    <Typography>Vista con detalles de una venta. Acceso: CASHIER, MANAGER, ADMIN.</Typography>
  </Box>
);

export default SalesDetails;

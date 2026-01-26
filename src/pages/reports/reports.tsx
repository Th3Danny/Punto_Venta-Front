import { Box, Typography } from '@mui/material';

const Reports = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Reportes Gerenciales
            </Typography>
            <Typography variant="body1">Aquí irán los reportes accesibles para MANAGER y ADMIN.</Typography>
        </Box>
    );
};

export default Reports;

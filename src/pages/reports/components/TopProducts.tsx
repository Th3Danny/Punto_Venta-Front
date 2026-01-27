import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from '@mui/material';

interface TopProduct {
    name: string;
    quantity: number;
}

interface TopProductsProps {
    products: TopProduct[];
}

export const TopProducts = ({ products }: TopProductsProps) => {
    return (
        <TableContainer component={Paper} sx={{ height: '100%' }}>
            <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h6">Productos Más Vendidos</Typography>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={2} align="center">Sin datos</TableCell>
                        </TableRow>
                    ) : (
                        products.map((p, i) => (
                            <TableRow key={i}>
                                <TableCell>{p.name}</TableCell>
                                <TableCell align="right">{p.quantity}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

import { Box } from '@mui/material';
export default TopProducts;

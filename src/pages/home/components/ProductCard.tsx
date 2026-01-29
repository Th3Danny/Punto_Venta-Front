import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import type { Product } from '@/models';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip
                        label={product.active ? 'Disponible' : 'Agotado'}
                        size="small"
                        color={product.active ? 'success' : 'error'}
                        variant="outlined"
                        sx={{ fontWeight: 'bold' }}
                    />
                </Box>
                <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2, minHeight: 40, opacity: 0.8 }}>
                    {product.description || 'Sin descripción'}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                        ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Stock: {product.stock} units
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

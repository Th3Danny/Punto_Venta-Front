import { Card, CardContent, Typography, Box } from '@mui/material';
import type { Product } from '@/models';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2, minHeight: 40 }}>
                    {product.description || 'Sin descripción'}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                        ${product.price.toFixed(2)}
                    </Typography>
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            color: product.active ? 'success.main' : 'error.main',
                            fontWeight: 'bold'
                        }}
                    >
                        {product.active ? 'Activo' : 'Inactivo'}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

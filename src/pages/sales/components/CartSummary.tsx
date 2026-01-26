import { Card, CardContent, Typography, Button, Divider, Box } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

interface CartSummaryProps {
    total: number;
    itemsCount: number;
    onCheckout: () => void;
    loading?: boolean;
}

export const CartSummary = ({ total, itemsCount, onCheckout, loading }: CartSummaryProps) => {
    const isDisabled = itemsCount === 0 || loading;

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Resumen de Venta
                </Typography>

                <Box sx={{ my: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">Subtotal:</Typography>
                        <Typography variant="body1">${total.toFixed(2)}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">IVA (16%):</Typography>
                        <Typography variant="body1">${(total * 0.16).toFixed(2)}</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Total:
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="primary">
                            ${(total * 1.16).toFixed(2)}
                        </Typography>
                    </Box>
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCart />}
                    onClick={onCheckout}
                    disabled={isDisabled}
                    sx={{ mt: 2 }}
                >
                    {loading ? 'Procesando...' : 'Procesar Venta'}
                </Button>

                {itemsCount === 0 && (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        align="center"
                        display="block"
                        sx={{ mt: 1 }}
                    >
                        Agrega productos al carrito para continuar
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default CartSummary;

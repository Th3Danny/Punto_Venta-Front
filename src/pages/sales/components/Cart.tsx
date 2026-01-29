import {
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Box,
    Divider
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import type { CartItem } from '@/models';

interface CartProps {
    items: CartItem[];
    onIncrement: (productId: number) => void;
    onDecrement: (productId: number) => void;
    onRemove: (productId: number) => void;
}

export const Cart = ({ items, onIncrement, onDecrement, onRemove }: CartProps) => {
    if (items.length === 0) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Carrito de Compras
                </Typography>
                <Box sx={{ py: 6, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                        El carrito está vacío
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                Carrito ({items.length})
            </Typography>

            <List sx={{ maxHeight: '50vh', overflowY: 'auto', px: 1 }}>
                {items.map((item, index) => (
                    <Box key={item.product.id}>
                        {index > 0 && <Divider sx={{ opacity: 0.5 }} />}
                        <ListItem
                            disableGutters
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    onClick={() => onRemove(item.product.id)}
                                    color="error"
                                    size="small"
                                >
                                    <Delete fontSize="small" />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={
                                    <Typography fontWeight="bold" variant="body1">
                                        {item.product.name}
                                    </Typography>
                                }
                                secondaryTypographyProps={{ component: 'div' }}
                                secondary={
                                    <Box sx={{ mt: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                bgcolor: 'rgba(111, 78, 55, 0.05)',
                                                borderRadius: 2,
                                                px: 0.5
                                            }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onDecrement(item.product.id)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Remove fontSize="small" />
                                                </IconButton>

                                                <Typography variant="body2" sx={{ minWidth: 25, textAlign: 'center', fontWeight: 'bold' }}>
                                                    {item.quantity}
                                                </Typography>

                                                <IconButton
                                                    size="small"
                                                    onClick={() => onIncrement(item.product.id)}
                                                >
                                                    <Add fontSize="small" />
                                                </IconButton>
                                            </Box>
                                            <Typography variant="body1" fontWeight="bold" color="primary">
                                                ${item.subTotal.toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                }
                            />
                        </ListItem>
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export default Cart;

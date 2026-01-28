import {
    Card,
    CardContent,
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
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Carrito de Compras
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
                        El carrito está vacío
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Carrito de Compras ({items.length} {items.length === 1 ? 'producto' : 'productos'})
                </Typography>

                <List>
                    {items.map((item, index) => (
                        <Box key={item.product.id}>
                            {index > 0 && <Divider />}
                            <ListItem
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => onRemove(item.product.id)}
                                        color="error"
                                    >
                                        <Delete />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={item.product.name}
                                    secondaryTypographyProps={{ component: 'div' }} // Evita error de anidamiento <p> en <p>
                                    secondary={
                                        <Box>
                                            <Typography component="div" variant="body2" color="text.secondary">
                                                ${item.product.price.toFixed(2)} c/u
                                            </Typography>

                                            {/* Controles de cantidad */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onDecrement(item.product.id)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Remove fontSize="small" />
                                                </IconButton>

                                                <Typography component="span" variant="body1" sx={{ minWidth: 30, textAlign: 'center' }}>
                                                    {item.quantity}
                                                </Typography>

                                                <IconButton
                                                    size="small"
                                                    onClick={() => onIncrement(item.product.id)}
                                                >
                                                    <Add fontSize="small" />
                                                </IconButton>

                                                <Typography component="span" variant="body1" sx={{ ml: 2, fontWeight: 'bold' }}>
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
            </CardContent>
        </Card>
    );
};

export default Cart;

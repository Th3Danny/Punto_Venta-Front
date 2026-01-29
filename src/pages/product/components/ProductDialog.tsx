import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Box,
    Grid
} from '@mui/material';
import { useState, useEffect } from 'react';
import type { Product, CreateProductCredentials } from '@/models';

interface ProductDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (product: CreateProductCredentials) => void;
    product: Product | null;
    loading: boolean;
}

export const ProductDialog = ({ open, onClose, onSave, product, loading }: ProductDialogProps) => {
    const [formData, setFormData] = useState<CreateProductCredentials>({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        active: true
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                active: product.active
            });
        } else {
            setFormData({
                name: '',
                description: '',
                price: 0,
                stock: 0,
                active: true
            });
        }
    }, [product, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name === 'price' || name === 'stock' ? Number(value) : value)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle sx={{ backgroundColor: 'primary.main', color: 'white' }}>
                    {product ? 'Editar Producto' : 'Nuevo Producto'}
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Nombre del Producto"
                                fullWidth
                                required
                                value={formData.name}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                label="Descripción"
                                fullWidth
                                multiline
                                rows={2}
                                value={formData.description}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="price"
                                label="Precio"
                                type="number"
                                fullWidth
                                required
                                value={formData.price}
                                onChange={handleChange}
                                margin="normal"
                                inputProps={{ step: "0.01", min: "0" }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="stock"
                                label="Stock Inicial"
                                type="number"
                                fullWidth
                                required
                                value={formData.stock}
                                onChange={handleChange}
                                margin="normal"
                                inputProps={{ min: "0" }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ mt: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="active"
                                            checked={formData.active}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    }
                                    label="Producto Activo"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} color="inherit" disabled={loading}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ProductDialog;

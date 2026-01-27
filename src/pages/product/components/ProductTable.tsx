import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Tooltip
} from '@mui/material';
import { Edit, Delete, Visibility, VisibilityOff } from '@mui/icons-material';
import type { Product } from '@/models';

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3 }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ backgroundColor: 'primary.main' }}>
                    <TableRow>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Descripción</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Precio</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                No hay productos registrados
                            </TableCell>
                        </TableRow>
                    ) : (
                        products.map((product) => (
                            <TableRow key={product.id} hover>
                                <TableCell>{product.id}</TableCell>
                                <TableCell sx={{ fontWeight: 'medium' }}>{product.name}</TableCell>
                                <TableCell>{product.description || 'Sin descripción'}</TableCell>
                                <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={product.active ? "Activo" : "Inactivo"}
                                        color={product.active ? "success" : "error"}
                                        variant="outlined"
                                        size="small"
                                        icon={product.active ? <Visibility /> : <VisibilityOff />}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => onEdit(product)} color="primary">
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton onClick={() => onDelete(product.id)} color="error">
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;

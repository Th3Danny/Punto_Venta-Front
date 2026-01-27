import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  CircularProgress,
  Breadcrumbs,
  Link
} from '@mui/material';
import { Add, Inventory } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useProductManager } from './hooks/useProductManager';
import { ProductTable, ProductDialog } from './components';

export const Product = () => {
  const navigate = useNavigate();
  const {
    products,
    loading,
    isDialogOpen,
    selectedProduct,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseDialog,
    handleSave,
    handleDelete
  } = useProductManager();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs / Header Action */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
            <Link
              underline="hover"
              color="inherit"
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/home')}
            >
              Home
            </Link>
            <Typography color="text.primary">Administración de Productos</Typography>
          </Breadcrumbs>
          <Typography variant="h4" component="h1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Inventory color="primary" fontSize="large" />
            Inventario de Productos
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenCreate}
          size="large"
          sx={{ borderRadius: 2, px: 3 }}
        >
          Nuevo Producto
        </Button>
      </Box>

      {/* Main Content */}
      <Paper sx={{ p: 0, overflow: 'hidden', borderRadius: 2 }}>
        {loading && products.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Cargando inventario...</Typography>
          </Box>
        ) : (
          <ProductTable
            products={products}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        )}
      </Paper>

      {/* Dialog for Create/Edit */}
      <ProductDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        product={selectedProduct}
        loading={loading}
      />
    </Container>
  );
};

export default Product;


import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useFetchAndLoad } from '@/hooks';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '@/services/product.services';
import { productManagerListAdapter } from '../adapters/product.adapter';
import type { Product, CreateProductCredentials } from '@/models';
import axios from 'axios';

export const useProductManager = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const { enqueueSnackbar } = useSnackbar();

    const [products, setProducts] = useState<Product[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const loadProducts = useCallback(async () => {
        try {
            const response = await callEndpoint(getProducts());
            const responseData = response.data;

            // Extracción robusta del array de productos
            const productList = Array.isArray(responseData.data)
                ? responseData.data
                : (Array.isArray(responseData) ? responseData : []);

            setProducts(productManagerListAdapter(productList));

            if (responseData.message && responseData.success) {
                // Opcional: mostrar mensaje de carga exitosa
                // enqueueSnackbar(responseData.message, { variant: 'success' });
            }
        } catch (error: any) {
            if (axios.isCancel(error)) return;
            enqueueSnackbar('Error al cargar productos', { variant: 'error' });
        }
    }, [callEndpoint, enqueueSnackbar]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const handleOpenCreate = () => {
        setSelectedProduct(null);
        setIsDialogOpen(true);
    };

    const handleOpenEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedProduct(null);
    };

    const handleSave = async (formData: CreateProductCredentials) => {
        try {
            if (selectedProduct) {
                // Modo Edición
                const response = await callEndpoint(updateProduct(selectedProduct.id, formData));
                if (response.data.success) {
                    enqueueSnackbar(response.data.message || 'Producto actualizado', { variant: 'success' });
                }
            } else {
                // Modo Creación
                const response = await callEndpoint(createProduct(formData));
                if (response.data.success) {
                    enqueueSnackbar(response.data.message || 'Producto creado', { variant: 'success' });
                }
            }
            handleCloseDialog();
            loadProducts();
        } catch (error: any) {
            if (axios.isCancel(error)) return;
            const msg = error.response?.status === 403
                ? (error.response?.data?.message || 'No estás autorizado para realizar esta acción')
                : (error.response?.data?.message || error.message || 'Error al guardar producto');
            enqueueSnackbar(msg, { variant: 'error' });
        }

    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

        try {
            const response = await callEndpoint(deleteProduct(id));
            if (response.data.success) {
                enqueueSnackbar(response.data.message || 'Producto eliminado', { variant: 'success' });
                loadProducts();
            }
        } catch (error: any) {
            if (axios.isCancel(error)) return;
            const msg = error.response?.status === 403
                ? (error.response?.data?.message || 'No estás autorizado para realizar esta acción')
                : (error.response?.data?.message || error.message || 'Error al eliminar producto');
            enqueueSnackbar(msg, { variant: 'error' });
        }

    };

    return {
        products,
        loading,
        isDialogOpen,
        selectedProduct,
        handleOpenCreate,
        handleOpenEdit,
        handleCloseDialog,
        handleSave,
        handleDelete,
        refreshProducts: loadProducts
    };
};

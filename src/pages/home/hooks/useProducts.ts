import { useState, useEffect } from 'react';
import { useFetchAndLoad } from '@/hooks';
import { getProducts } from '@/services/product.services';
import type { Product } from '@/models';
import { useSnackbar } from 'notistack';
import { homeProductsAdapter } from '@/pages/home/adapters/home.adapter';

export const useProducts = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const { enqueueSnackbar } = useSnackbar();
    const [products, setProducts] = useState<Product[]>([]);

    const loadProducts = async () => {
        try {
            const result = await callEndpoint(getProducts());
            if (result.data) {
                setProducts(homeProductsAdapter(result.data));
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Error al cargar productos';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return {
        products,
        loading,
        reloadProducts: loadProducts
    };
};

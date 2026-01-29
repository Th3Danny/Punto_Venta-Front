import { useState, useEffect } from 'react';
import { useFetchAndLoad } from '@/hooks';
import { getProducts } from '@/services/product.services';
import type { Product } from '@/models';
import { useSnackbar } from 'notistack';
import { homeProductsAdapter } from '@/pages/home/adapters/home.adapter';
import axios from 'axios';


export const useProducts = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const { enqueueSnackbar } = useSnackbar();
    const [products, setProducts] = useState<Product[]>([]);

    const loadProducts = async () => {
        try {
            const result = await callEndpoint(getProducts());
            const responseData = result.data;

            if (responseData) {
                const productList = Array.isArray(responseData.data)
                    ? responseData.data
                    : (Array.isArray(responseData) ? responseData : []);

                setProducts(homeProductsAdapter(productList));

                // Mostrar mensaje de éxito si existe
                if (responseData.message && responseData.success) {
                    enqueueSnackbar(responseData.message, { variant: 'success' });
                }
            }

        } catch (error: any) {
            if (axios.isCancel(error)) return;
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

import type { Product, AxiosCall, CreateProductData, ProductResponse } from '@/models';
import { loadAbort } from '@/utils';
import apiAxiosInstance from './api.service';

// Obtener todos los productos activos
export const getProducts = (): AxiosCall<Product[]> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get<Product[]>('/products', {
            signal: controller.signal
        }),
        controller
    };
};

// Buscar productos por nombre
export const searchProducts = (query: string): AxiosCall<Product[]> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get<Product[]>('/products/search', {
            params: { query },
            signal: controller.signal
        }),
        controller
    };
};

// Obtener un producto por ID
export const getProductById = (id: number): AxiosCall<Product> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get<Product>(`/products/${id}`, {
            signal: controller.signal
        }),
        controller
    };
};

// Crear un nuevo producto
export const createProduct = (productData: CreateProductData): AxiosCall<ProductResponse> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.post<ProductResponse>('/products', productData, {
            signal: controller.signal
        }),
        controller
    };
}
    

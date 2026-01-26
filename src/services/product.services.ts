import type { AxiosCall, ProductCredentials, BackendProductResponse, CreateProductCredentials } from '@/models';
import { loadAbort } from '@/utils';
import apiAxiosInstance from './api.service';

// Obtener todos los productos activos
export const getProducts = (params?: Partial<ProductCredentials>): AxiosCall<BackendProductResponse> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get<BackendProductResponse>('/products', {
            params,
            signal: controller.signal
        }),
        controller
    };
};



// Buscar productos por nombre
export const searchProducts = (query: string): AxiosCall<BackendProductResponse> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get<BackendProductResponse>('/products/search', {
            params: { query },
            signal: controller.signal
        }),
        controller
    };
};

// Obtener un producto por ID
export const getProductById = (id: number): AxiosCall<BackendProductResponse> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get<BackendProductResponse>(`/products/${id}`, {
            signal: controller.signal
        }),
        controller
    };
};


// Crear un nuevo producto
export const createProduct = (productData: CreateProductCredentials): AxiosCall<BackendProductResponse> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.post<BackendProductResponse>('/products', productData, {
            signal: controller.signal
        }),
        controller
    };
};


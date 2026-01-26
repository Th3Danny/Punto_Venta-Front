// Modelo de datos para productos
export interface Product {
    id: number; 
    name: string;
    description: string;
    price: number;
    active: boolean;
}

// Interfaces para crear/actualizar productos
export interface CreateProductData {
    name: string;
    description: string;
    price: number;
    active: boolean;
}

// Respuesta del backend al crear producto
export interface ProductResponse {
    data: {
        id: number;
        name: string;
        description: string;
        price: number;
        active: boolean;
    };
    message: string;
    success: boolean;
    httpStatus: string;
}

// Modelo de datos para productos
export interface ProductCredentials {
    id: number;
    name: string;
    description: string;
    price: number;
    active: boolean;
}

export type Product = ProductCredentials;


// Interfaces para crear/actualizar productos
export interface CreateProductCredentials {
    name: string;
    description: string;
    price: number;
    active: boolean;
}

// Respuesta del backend al gestionar productos
export interface BackendProductResponse {
    data: ProductCredentials | ProductCredentials[];
    message: string;
    success: boolean;
    httpStatus: string;
}

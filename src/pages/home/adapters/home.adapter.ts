import { productsAdapter } from '@/adapters/product.adapter';
import type { Product } from '@/models';

// Adapter específico de la página Home
// Actualmente delega al adapter global `productsAdapter`,
// pero aquí se pueden aplicar transformaciones específicas de UI.
export const homeProductsAdapter = (products: any[]): Product[] => {
    // Ejemplo: podríamos filtrar o añadir campos específicos para la vista Home
    // Por ahora delegamos al adapter global para mantener consistencia.
    return productsAdapter(products);
};

export default homeProductsAdapter;

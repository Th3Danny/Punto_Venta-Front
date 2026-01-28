import { productsAdapter } from '@/adapters/product.adapter';
import type { Product } from '@/models';


export const homeProductsAdapter = (products: any[]): Product[] => {
    return productsAdapter(products);
};

export default homeProductsAdapter;

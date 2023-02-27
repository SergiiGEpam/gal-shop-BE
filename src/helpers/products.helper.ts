import { Product } from '../types/product';

export const availableProducts = async (products: Product[]) => {
    const data = products.filter((product) => product.count);
    return await Promise.resolve(data);
};

export const findProductById = async (products: Product[],  id: string) => {
    const data = products.find((product) => product.id === id);
    return await Promise.resolve(data);
};

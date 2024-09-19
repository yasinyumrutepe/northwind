import api from '../api/api';
import { Paginate } from '../types/Paginate';
import { CreateProduct, Product } from '../types/Product';

export const fetchAllProducts = async (page?:number,limit?:number) => {

if(!page || !limit){
        const response = await api.get<Paginate<Product[]>>('/Products');
        return response.data
}
const response = await api.get<Paginate<Product[]>>('/Products?page='+page+'&limit='+limit+'');
return response.data;
}

export const fetchProduct = async (id:Number) => {
    const response = await api.get<Product>(`/Products/${id}`);
    return response.data;
}

export const createProduct = async (product:CreateProduct) => {
    const response = await api.post<Product>('/Products', product);
    return response.data;
}

export const updateProduct = async (id:Number, product:Product) => {
    const response = await api.put<Product>(`/Product/${id}`, product);
    return response.data;
}

export const deleteProduct = async (id:Number) => {
    const response = await api.delete<number>(`/Product/${id}`);
    return response.data;
  
}


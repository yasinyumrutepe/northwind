import api from '../api/api';
import { Category } from '../types/Category';
import { Paginate } from '../types/Paginate';

export const fetchAllCategories = async () => {
    const response = await api.get<Paginate<Category[]>>('/Category');
    return response.data;
}

export const fetchCategory = async (id:Number) => {
    const response = await api.get<Category>(`/Category/${id}`);
    return response.data;
}

export const createCategory = async (category:Object) => {
    const response = await api.post('/Category', category);
    return response.data;
}

export const updateCategory = async (id:Number, category:Object) => {
    const response = await api.put(`/Category/${id}`, category);
    return response.data;
}

export const deleteCategory = async (id:Number) => {
    const response = await api.delete(`/Category/${id}`);
    return response.data;
  
}


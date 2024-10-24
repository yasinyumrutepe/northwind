import api from '../api/api';

export const fetchFavoriteProducts = async () => {
    const response = await api.get('/ProductFavorite');
    return response.data;
}

export const addFavoriteProduct = async (productID: number) => {
    const response = await api.post('/ProductFavorite', { productID });
    return response.data;
}

export const deleteFavoriteProduct = async (productID: number) => {
    const response = await api.delete(`/ProductFavorite/${productID}`);
    return response.data;
}
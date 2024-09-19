import api from '../api/api';
import {  BasketRequest } from '../types/Product';



export const fetchAllBaskets = async () => {
    const response = await api.get('/Basket');
    return response.data;
}


export const fetchBasket = async (basketId:string) => {
    const response = await api.get('/Basket/'+basketId);
    return response.data;
}

export const addBasketService = async (basket:BasketRequest[]) => {
    const response = await api.post<BasketRequest[]>('/Basket', basket);
    return response.data;
}

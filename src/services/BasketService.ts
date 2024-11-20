import api from '../api/api';
import {  BasketRequest, BasketResponse, UpdateQuantityType } from '../types/Product';



export const fetchAllBaskets = async () => {
    const response = await api.get('/Basket/detail');
    return response.data;
}


export const fetchBasket = async () => {
    const response = await api.get('/Basket');
    return response.data;
}

export const addBasketService = async (basket:BasketRequest) => {
    const response = await api.post<BasketRequest>('/Basket', basket);
    return response.data;
}

export const deleteBasket = async (productID:number) => {
    console.log(productID);
    const response = await api.delete<BasketResponse>('/Basket?productId='+productID);
    return response.data;
}

export const updateQuantity = async (updateQuantityData:UpdateQuantityType) => {
    console.log(updateQuantityData);
    const response = await api.put<BasketResponse>('/Basket/quantity', updateQuantityData);
    return response.data;
}

export const addCampaign = async (campaignName:string) => {
    const response = await api.get(`/Basket/campaign/?campaignName=${campaignName}`);
    return response.data;
}
import api from '../api/api';
import { ChangeOrderStatusRequest, CreateOrder} from '../types/Order';

export const fetchAllOrders = async (page?:number,limit?:number) => {

    if(!page || !limit){
        const response = await api.get('/Order');
        return response.data
    }

    const response = await api.get('/Order?page='+page+'&limit='+limit+'');
    return response.data;
}

export const fetchAllCustomerOrders = async (page?:number,limit?:number) => {
    
        if(!page || !limit){
            const response = await api.get('/Order/customer');
            return response.data
        }
    
        const response = await api.get('/Order/customer?page='+page+'&limit='+limit+'');
        return response.data;
    }

export const fetchOrder = async (id:Number) => {
    const response = await api.get(`/Order/${id}`);
    return response.data;
}

export const createOrder = async (order:CreateOrder) => {
    const response = await api.post('/Order',order);
    return response.data;
}


export const updateOrder = async (id:Number, order:Object) => {
    const response = await api.put(`/Order/${id}`, order);
    return response.data;
}

export const deleteOrder = async (id:Number) => {
    const response = await api.delete(`/Order/${id}`);
    return response.data;
  
}

export const changeOrderStatus = async (changeStatusRequest:ChangeOrderStatusRequest) => {
    const response = await api.put(`/Order/status/`,changeStatusRequest);
    return response.data;
}


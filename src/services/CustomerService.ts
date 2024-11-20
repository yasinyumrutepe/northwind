import api from '../api/api';

export const fetchAllCustomers = async () => {
    const response = await api.get('/Customer');
    return response.data;
}

export const fetchCustomer = async (id:Number) => {
    const response = await api.get(`/Customer/${id}`);
    return response.data;
}

export const fetchCustomerByToken = async (token:String) => {
    const response = await api.get(`/Customer/token/${token}`);
    return response.data;
}




export const createCustomer = async (customer:Object) => {
    const response = await api.post('/Customer', customer);
    return response.data;
}

export const updateCustomer = async (updateCustomer:any) => {
    const response = await api.put(`/Customer`, updateCustomer);
    return response.data;
}

export const deleteCustomer = async (id:Number) => {
    const response = await api.delete(`/Customer/${id}`);
    return response.data;
  
}


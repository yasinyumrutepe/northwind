import api from '../api/api';

export const fetchAllEmployees = async () => {
    const response = await api.get('/Employee');
    return response.data;
}

export const fetchEmployee = async (id:Number) => {
    const response = await api.get(`/Employee/${id}`);
    return response.data;
}

export const createEmployee = async (employee:Object) => {
    const response = await api.post('/Employee', employee);
    return response.data;
}

export const updateEmployee = async (id:Number, employee:Object) => {
    const response = await api.put(`/Employee/${id}`, employee);
    return response.data;
}

export const deleteEmployee = async (id:Number) => {
    const response = await api.delete(`/Employee/${id}`);
    return response.data;
  
}


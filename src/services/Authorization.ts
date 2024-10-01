import api from "../api/api";
export const isAuthorized = async () => {
    const response = await api.get('/Authorization');
    return response.data;
}
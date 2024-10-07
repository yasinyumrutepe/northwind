import api from "../api/api";

export const createSession = async () => {
    const response = await api.post("/Checkout/create-checkout-session");
    return response.data;
}


export const createIntent = async (intentData:any) => {
    const response = await api.post("/Checkout/create-intent",intentData);
    return response.data;
}
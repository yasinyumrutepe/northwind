import axios from "axios"
import { LoginRequest, RegisterRequest } from "../types/Auth";
const baseURL = process.env.REACT_APP_API_URL;


export const fetchLogin=async(loginRequest:LoginRequest)=>{
    const response = await axios.post(`${baseURL}/Auth/login`,loginRequest);
    return response.data;
}

export const fetchRegister = async(registerRequest:RegisterRequest)=>{
    const response = await axios.post(`${baseURL}/Auth/register`,registerRequest)
    return response.data
}

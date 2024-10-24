import axios from "axios"
import { LoginRequest, RegisterRequest } from "../types/Auth";


export const fetchLogin=async(loginRequest:LoginRequest)=>{
    const response = await axios.post('http://localhost:5142/api/Auth/login',loginRequest);
    return response.data;
}

export const fetchRegister = async(registerRequest:RegisterRequest)=>{
    const response = await axios.post('http://localhost:5142/api/Auth/register',registerRequest)
    return response.data
}

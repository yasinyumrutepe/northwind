import axios from "axios"
import { ChangePasswordRequest, ChangePasswordResponse, LoginRequest, RegisterRequest } from "../types/Auth";
const baseURL = process.env.REACT_APP_API_URL;


export const fetchLogin=async(loginRequest:LoginRequest)=>{
    const response = await axios.post(`${baseURL}/Auth/login`,loginRequest);
    return response.data;
}

export const fetchRegister = async(registerRequest:RegisterRequest)=>{
    const response = await axios.post(`${baseURL}/Auth/register`,registerRequest)
    return response.data
}

export const changePassword = async(changePasswordRequest:ChangePasswordRequest): Promise<ChangePasswordResponse>=>{
    const response = await axios.post<ChangePasswordResponse>(`${baseURL}/Auth/change-password`,changePasswordRequest)
    return response.data
}

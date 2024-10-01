import { isAuthorized } from "../services/Authorization";
import { useQueryFunc } from "../config/query";


export const useFetchAuthorization = () =>{
  const authorized = useQueryFunc(['authorized'],isAuthorized)
  return authorized
}
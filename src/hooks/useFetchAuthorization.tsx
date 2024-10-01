import { useQuery } from "@tanstack/react-query";
import { isAuthorized } from "../services/Authorization";

export const useFetchAuthorization = () =>{
    const authorized = useQuery({
        queryKey: ['authorized'],
        queryFn: () => isAuthorized(),
        retry:false
      },
    );
    return authorized
}
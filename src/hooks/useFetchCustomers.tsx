import { useQuery } from "@tanstack/react-query";
import { fetchCustomerByToken } from "../services/CustomerService";


export const useCustomerDetail = (token: string) => {
    const customerDetail = useQuery({
        queryKey: ['customerDetail', token],
        queryFn: () => fetchCustomerByToken(token),
        retry: false,
        refetchOnWindowFocus: false,
    });

    return customerDetail;
};
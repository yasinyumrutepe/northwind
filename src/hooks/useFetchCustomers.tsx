import { useQuery } from "@tanstack/react-query";
import { fetchCustomerByToken } from "../services/CustomerService";
import { useQueryFunc } from "../config/query";


export const useCustomerDetail = (token: string) => {
    const customerDetail = useQuery({
        queryKey: ['customerDetail', token],
        queryFn: () => fetchCustomerByToken(token),
        retry: false,
        refetchOnWindowFocus: false,
    });

    return customerDetail;
};


export const useCustomerDetail2 = (token: string) => {
    const customerDetail = useQueryFunc(['customerDetail', token], () => fetchCustomerByToken(token), );
    return customerDetail;
}
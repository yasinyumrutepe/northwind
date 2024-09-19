import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts, fetchProduct } from "../services/ProductService";



export const useFetchProducts = ()=>{
    const allProductsQuery = useQuery({
      queryKey: ['products'],
      queryFn: () => fetchAllProducts(),
      retry:false
    });
   return allProductsQuery
   
}


export const useFetchProduct = (id:number)=>{
    const productDetailQuery = useQuery({
      queryKey: ['products'],
      queryFn: () => fetchProduct(id),
      retry:false
    });
   return productDetailQuery
   
}

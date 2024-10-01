import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts, fetchProduct, fetchProductsByCategory } from "../services/ProductService";
import { GetProductsByCategoryRequest } from "../types/Product";



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


export const useFetchProductsByCategory = (request:GetProductsByCategoryRequest)=>{
  const productsByCategory = useQuery({
    queryKey: ['products',request],
    queryFn: () => fetchProductsByCategory(request),
    retry:false
  });
  return productsByCategory
}

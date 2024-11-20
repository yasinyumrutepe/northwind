import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts, fetchProduct, fetchProductsByCategory } from "../services/ProductService";
import { GetProductsByCategoryRequest } from "../types/Product";
import { useQueryFunc } from "../config/query";
import { FilterType } from "../types/Variant";



export const useFetchProducts = (filters?:FilterType)=>{
    const allProductsQuery = useQuery({
      queryKey: ['products', filters],
      queryFn: () => fetchAllProducts(filters),
      retry:false,
      refetchOnWindowFocus:false,
      refetchOnMount:true
      
   
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


export const useFetchProductsByCategory = (request:FilterType)=>{
  const productsByCategory = useQuery({
    queryKey: ['products',request],
    queryFn: () => fetchProductsByCategory(request),
    retry:false
  });
  return productsByCategory
}



export const useFetchProduct2 = (id:number)=>{
    const productDetailQuery = useQueryFunc(['products',id],()=>fetchProduct(id))
    return productDetailQuery
}

export const useFetchProductsByCategory2 = (request:FilterType)=>{
    const productsByCategory = useQueryFunc(['products',request],()=>fetchProductsByCategory(request))
    return productsByCategory
}
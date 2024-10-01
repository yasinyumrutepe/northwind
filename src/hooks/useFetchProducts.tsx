import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts, fetchProduct, fetchProductsByCategory } from "../services/ProductService";
import { GetProductsByCategoryRequest } from "../types/Product";
import { useQueryFunc } from "../config/query";



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


export const useFetchProducts2 = ()=>{
    const allProductsQuery = useQueryFunc(['products'],()=>fetchAllProducts())
    return allProductsQuery
}

export const useFetchProduct2 = (id:number)=>{
    const productDetailQuery = useQueryFunc(['products',id],()=>fetchProduct(id))
    return productDetailQuery
}

export const useFetchProductsByCategory2 = (request:GetProductsByCategoryRequest)=>{
    const productsByCategory = useQueryFunc(['products',request],()=>fetchProductsByCategory(request))
    return productsByCategory
}
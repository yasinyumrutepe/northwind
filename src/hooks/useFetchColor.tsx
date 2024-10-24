import { useQuery } from "@tanstack/react-query";
import { fetchAllVariants } from "../services/VariantService";




export const useFetchVariants = ()=>{
    const allColors = useQuery({
      queryKey: ['variants'],
      queryFn: () => fetchAllVariants(),
      retry:false,
      refetchOnWindowFocus:false,
      refetchOnMount:true
      
   
    });
   return allColors
   
}
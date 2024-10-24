import { useQuery } from "@tanstack/react-query";
import {fetchAllCategories, fetchCategory} from "../services/CategoryService"
import { useQueryFunc } from "../config/query";


export const useFetchCategories = () =>{
    const allCategories = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchAllCategories(),
        retry:false,
        refetchOnWindowFocus:false,
        refetchOnMount:false
      },
    );
    return allCategories
}



export const useFetchCategory = (categoryID:number)=>{
  const category = useQuery({
      queryKey: ['category', categoryID],
      queryFn: () => fetchCategory(categoryID),
      enabled: !isNaN(categoryID),
      retry:false,
      refetchOnWindowFocus:false,
      refetchOnMount:false
    },
  );
  return category
}




export const useFetchCategories2 = () =>{
    const allCategories = useQueryFunc(['categories'],()=>fetchAllCategories())
    return allCategories
}

export const useFetchCategory2 = (categoryID:number)=>{
    const category = useQueryFunc(['category', categoryID],()=>fetchCategory(categoryID))
    return category
}




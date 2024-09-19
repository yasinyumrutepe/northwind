import { useQuery } from "@tanstack/react-query";
import {fetchAllCategories, fetchCategory} from "../services/CategoryService"


export const useFetchCategories = () =>{
    const allCategories = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchAllCategories(),
        retry:false
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
        
      },
    );
    return category
}

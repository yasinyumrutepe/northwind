import { useQuery } from "@tanstack/react-query"


export const useQueryFunc = (qKey:any,qFn:any)=>{

    const useQueryHook = useQuery({
        queryKey:qKey,
        queryFn:qFn,
        retry:false,

    })

    return useQueryHook

}

export const useMutationFunc = ()=>{

}

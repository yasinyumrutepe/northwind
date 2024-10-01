import { useMutation, useQuery } from "@tanstack/react-query"


export const useQueryFunc = (qKey:any,qFn:any)=>{

    const useQueryHook = useQuery({
        queryKey:qKey,
        queryFn:qFn,
        retry:false,
        refetchOnWindowFocus:false,
    })
    return useQueryHook
}

export const useMutationFunc = (mtFn:any)=>{

    const useMutationHook = useMutation({
        mutationFn:mtFn,
        retry:false,
    })

    return useMutationHook
}


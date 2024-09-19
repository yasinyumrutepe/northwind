 export interface Paginate<T>  {
    data: T,
    page:number,
    pageSize:number,
    totalPage:number,
    totalCount:number,
}


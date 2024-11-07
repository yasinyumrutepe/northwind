

export type VariantType = {
    variantID: number;
    variantGroupName: string;
    variantName: string;
    hexCode: string;
}

export type FilterType = {
    paginatedRequest:{
        page:number,
        limit:number
      },
      orberByKey:string,
      productFilterKeys:{
        categories: number[] | undefined,
        minPrice: number | undefined,
        maxPrice: number | undefined,
        colors: number[] | undefined,
        sizes: number[] | undefined,
        ratings: number[] | undefined
      }
}
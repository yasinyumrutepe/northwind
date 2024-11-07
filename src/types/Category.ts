import { Product } from "./Product";

export type Category = {
    categoryID: number;
    categoryName: string;
    description: string;
    mainCategoryID: number;
    slug: string;
    products:Product[];
}


export type CategoryRequest = {
    categoryID: number;
    categoryName: string;
    description: string;
    mainCategoryID: number;
    slug: string;
    list : CategoryRequest[];
}

export type CategoryResponse = {
    categoryID: number;
    categoryName: string;
    description: string;
    mainCategoryID: number;
    slug: string;
}
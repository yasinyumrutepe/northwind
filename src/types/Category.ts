import { Product } from "./Product";

export type Category = {
    categoryID: number;
    name: string;
    parent_ID: number;
    slug: string;
    products:Product[];
}


export type CategoryRequest = {
    categoryID: number;
    name: string;
    parent_ID: number;
    slug: string;
    list : CategoryRequest[];
}

export type CategoryResponse = {
    categoryID: number;
    name: string;
    parent_ID: number;
    slug: string;
}
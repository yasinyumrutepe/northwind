import { Product } from "./Product";

export type Category = {
    categoryID: number;
    categoryName: string;
    description: string;
    products:Product[];
}
import { Product } from "./Product";

export type ProductFavorite = {
  productFavoriteID: number;
  productID: number;
  customerID: string;
  product: Product;
};

export type ProductFavoriteRequest = {
  productID: number;
};

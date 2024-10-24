import { Customer } from "./Customer";
import { Product } from "./Product";


export type ProductReviewRequest = {
    productId: number;
    review: string;
    star: number;
    orderDetailID: number;
  };
  
  export type ProductReview = {
    productReviewID: number;
    productId: number;
    review: string;
    star: number;
    customerID: string;
    customer: Customer;
    product: Product;
  };
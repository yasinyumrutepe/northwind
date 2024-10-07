import { Category } from './Category';
import { ProductReview } from './ProductReview';
export type Product = {
   productID : number;
   productName : string;
   categoryID : number;
   unitPrice : number;
   quantityPerUnit : string;
   category? : Category;
   description? : string;
   productImages? : ProductImage[];
   productReviews? : ProductReview[];
};

export type GetProductsByCategoryRequest = {
   categoryID : number;
   page : number;
   limit : number;
};


export type ProductImage = {
   productImageID : number;
   productID : number;
   imagePublicID : string;
   imagePath : string;
};

export type CreateProduct = {
   productName : string;
   categoryID : number;
   unitPrice : number;
   quantityPerUnit : string;
   description : string;
};


export type BasketRequest = {
   basketID : string;
   items : BasketItem[];
   totalPrice : number;
};

export type BasketItem = {
   productID : number;
   productName : string;
   categoryID : number;
   categoryName : string;
   unitPrice : number;
   quantity : number;
   totalPrice : number;
   images : ProductImage[];
   discount : number;

};
export type UpdateQuantityType = {
   productID: number;
   quantity: number;
 };




export type BasketResponse = {
   product : BasketProduct[];
   totalPrice : number;
};
export type BasketProduct = {
   basketID : string;
   product : Product;
   quantity : number;
   
};




export type BasketData = {
   productID : number;
   categoryID : number;
   productName : string;
   categoryName : string;
   unitPrice : number;
   quantity : number;

};
import { Category } from './Category';
import { ProductFavorite } from './ProductFavorite';
import { ProductReview } from './ProductReview';
export type Product = {
   productID : number;
   productName : string;
   categoryID : number;
   unitPrice : number;
   unitsInStock : number;
   category? : Category;
   description? : string;
   productImages? : ProductImage[];
   productReviews? : ProductReview[];
   productFavorites? : ProductFavorite[];
};

export type GetProductsByCategoryRequest = {
   slug : string;
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
   description : string;
};


export type BasketRequest = {
   basketID : string;
   items : BasketItem[];
   totalPrice : number;
};

export type BasketResponse = {
   basketID : string;
   items : BasketItem[];
   discount : Discount;
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

export type Discount = {
   campaingName : string;
   discountAmount : number;
   isPercent : boolean;
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
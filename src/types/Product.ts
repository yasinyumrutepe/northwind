import { Category } from './Category';
export type Product = {
   productID : number;
   productName : string;
   categoryID : number;
   unitPrice : number;
   quantityPerUnit : string;
   category? : Category;
};

export type CreateProduct = {
   productName : string;
   categoryID : number;
   unitPrice : number;
   quantityPerUnit : string;
};


export type BasketRequest = {
   basketID : string;
   productID : number;
   quantity : number;
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


export type BasketItem = {
   basketID : number;
   basketData: BasketData[];
};

export type BasketData = {
   productID : number;
   categoryID : number;
   productName : string;
   categoryName : string;
   unitPrice : number;
   quantity : number;

};
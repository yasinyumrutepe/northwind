import { Customer } from './Customer';
import { Employee } from './Employee';


export type Order = {
    orderID: number;
    customerID: string;
    employeeID: number;
    orderDate?: Date | null;
    requiredDate?: Date | null;
    shippedDate?: Date | null;
    freight: number;
    shipName: string;
    shipCity: string;
    shipPostalCode: string;
    shipCountry: string;
    shipAddress: string;
    customer?: Customer; 
    employee?: Employee;
    orderDetails?: OrderDetail[];

};
export type CreateOrder = {
    token: string;
    orderDate?: Date | null;
    requiredDate?: Date | null;
    shippedDate?: Date | null;
    orderDetails?: OrderDetail[];

};

export type OrderDetail = {
    productID: number;
    unitPrice: number;
    quantity: number;
    discount: number;
};

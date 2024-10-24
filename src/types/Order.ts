import { Customer } from "./Customer";
import { Employee } from "./Employee";
import { Product } from "./Product";

export type Order = {
  orderID: number;
  customerID: string;
  employeeID: number;
  orderDate?: Date | null;
  requiredDate?: Date | null;
  shippedDate?: Date | null;
  orderNumber: string;
  freight: number;
  shipName: string;
  shipCity: string;
  shipPostalCode: string;
  shipCountry: string;
  shipAddress: string;
  totalPrice: number;
  customer?: Customer;
  employee?: Employee;
  orderStatuses: OrderStatus[];
  orderDetails?: OrderDetail[];
};
export type CreateOrder = {
  orderDate?: Date | null;
  requiredDate?: Date | null;
  shippedDate?: Date | null;
  freight?: number | 0;
  shipName: string;
  shipAddress: string;
  shipCity: string;
  shipRegion: string;
  shipPostalCode: string;
  shipCountry: string;
};

export type OrderDetail = {
  productID: number;
  unitPrice: number;
  quantity: number;
  discount: number;
  product: Product;
};

export type OrderStatus = {
  orderStatusID: number;
  orderID:number;
  statusID: number;
  status: Status;
  createdAt: Date;
};

export type Status = {
  statusID: number;
  statusName: string;
  statusNumber: number;
  color: string;
};
export type OrderDetailProps = {
  order: Order;
};

export type ChangeOrderStatusRequest = {
  orderID: number;
  statusID: number;
};

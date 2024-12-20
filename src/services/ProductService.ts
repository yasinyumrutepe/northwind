import api from "../api/api";
import { Paginate } from "../types/Paginate";
import { GetProductsByCategoryRequest, Product, UpdateProductRequest } from "../types/Product";
import { FilterType } from "../types/Variant";

export const fetchAllProducts = async (filters?: FilterType) => {
  let url = `/Products?paginatedRequest.page=${filters?.paginatedRequest.page || 1}&paginatedRequest.limit=${filters?.paginatedRequest.limit || 20}`;

  const addQueryParam = (key: string, value: any) => {
    if (value !== undefined && value !== null && value !== '') {
      url += `&${key}=${encodeURIComponent(value)}`;
    }
  };
  addQueryParam('orderByKey', filters?.orberByKey);
  addQueryParam('productFilterKeys.categories', filters?.productFilterKeys.categories?.join(','));
  addQueryParam('productFilterKeys.minPrice', filters?.productFilterKeys.minPrice);
  addQueryParam('productFilterKeys.maxPrice', filters?.productFilterKeys.maxPrice);
  addQueryParam('productFilterKeys.colors', filters?.productFilterKeys.colors?.join(','));
  addQueryParam('productFilterKeys.sizes', filters?.productFilterKeys.sizes?.join(','));
  addQueryParam('productFilterKeys.ratings', filters?.productFilterKeys.ratings?.join(','));
  addQueryParam('productFilterKeys.slug',filters?.productFilterKeys.slug);

  // API isteği
  const response = await api.get<Paginate<Product[]>>(url);
  return response.data;
};


export const fetchProduct = async (id: Number) => {
  const response = await api.get<Product>(`/Products/${id}`);
  return response.data;
};

export const fetchProductsByCategory = async (filters?: FilterType) =>{
let url = `/Products/category?paginatedRequest.page=${filters?.paginatedRequest.page || 1}&paginatedRequest.limit=${filters?.paginatedRequest.limit || 20}`;

const addQueryParam = (key: string, value: any) => {
  if (value !== undefined && value !== null && value !== '') {
    url += `&${key}=${encodeURIComponent(value)}`;
  }
};
addQueryParam('orderByKey', filters?.orberByKey);
addQueryParam('productFilterKeys.categories', filters?.productFilterKeys.categories?.join(','));
addQueryParam('productFilterKeys.minPrice', filters?.productFilterKeys.minPrice);
addQueryParam('productFilterKeys.maxPrice', filters?.productFilterKeys.maxPrice);
addQueryParam('productFilterKeys.colors', filters?.productFilterKeys.colors?.join(','));
addQueryParam('productFilterKeys.sizes', filters?.productFilterKeys.sizes?.join(','));
addQueryParam('productFilterKeys.ratings', filters?.productFilterKeys.ratings?.join(','));
addQueryParam('productFilterKeys.slug',filters?.productFilterKeys.slug);

const response = await api.get<Paginate<Product[]>>(url);
return response.data;
};

export const createProduct = async (product: any) => {
  const response = await api.post<Product>("/Products", product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProduct = async ( product: UpdateProductRequest) => {
  const response = await api.put<Product>(`/Products`, product);
  return response.data;
};

export const deleteProduct = async (id: Number) => {
  const response = await api.delete<number>(`/Product/${id}`);
  return response.data;
};

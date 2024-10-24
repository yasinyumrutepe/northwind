import api from "../api/api";
import { Paginate } from "../types/Paginate";
import { GetProductsByCategoryRequest, Product } from "../types/Product";
import { FilterType } from "../types/Variant";

export const fetchAllProducts = async (filters?: FilterType) => {
  let url = `/Products?paginatedRequest.page=${filters?.paginatedRequest.page || 1}&paginatedRequest.limit=${filters?.paginatedRequest.limit || 10}`;

  const addQueryParam = (key: string, value: any) => {
    if (value !== undefined && value !== null && value !== '') {
      url += `&${key}=${encodeURIComponent(value)}`;
    }
  };

  // Filtreleri ekleme
  addQueryParam('orderByKey', filters?.orberByKey);
  addQueryParam('productFilterKeys.categories', filters?.productFilterKeys.categories?.join(','));
  addQueryParam('productFilterKeys.minPrice', filters?.productFilterKeys.minPrice);
  addQueryParam('productFilterKeys.maxPrice', filters?.productFilterKeys.maxPrice);
  addQueryParam('productFilterKeys.colors', filters?.productFilterKeys.colors?.join(','));
  addQueryParam('productFilterKeys.sizes', filters?.productFilterKeys.sizes?.join(','));
  addQueryParam('productFilterKeys.ratings', filters?.productFilterKeys.ratings?.join(','));

  // API isteği
  const response = await api.get<Paginate<Product[]>>(url);
  return response.data;
};


export const fetchProduct = async (id: Number) => {
  const response = await api.get<Product>(`/Products/${id}`);
  return response.data;
};

export const fetchProductsByCategory = async (
  request: GetProductsByCategoryRequest
) => {
  if (!request.page || !request.limit) {
    const response = await api.get<Paginate<Product[]>>(
      `/Products/category?categoryID=${request.categoryID}`
    );
    return response.data;
  }
  const response = await api.get<Paginate<Product[]>>(
    `/Products/category?categoryID=${request.categoryID}&page=${request.page}&limit=${request.limit}`
  );
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

export const updateProduct = async ( product: Product) => {
  const response = await api.put<Product>(`/Products`, product);
  return response.data;
};

export const deleteProduct = async (id: Number) => {
  const response = await api.delete<number>(`/Product/${id}`);
  return response.data;
};

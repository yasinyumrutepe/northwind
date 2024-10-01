import api from "../api/api";
import { Paginate } from "../types/Paginate";
import { GetProductsByCategoryRequest, Product } from "../types/Product";

export const fetchAllProducts = async (page?: number, limit?: number) => {
  if (!page || !limit) {
    const response = await api.get<Paginate<Product[]>>("/Products");
    return response.data;
  }
  const response = await api.get<Paginate<Product[]>>(
    "/Products?page=" + page + "&limit=" + limit + ""
  );
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

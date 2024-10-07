import api from '../api/api';
import { ProductReviewRequest } from '../types/ProductReview';


export const createReview = async (productReview:ProductReviewRequest) => {
  const response = await api.post('/ProductReview',productReview );
  return response.data;
};
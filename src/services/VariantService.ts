
import api from "../api/api";
import { VariantType } from "../types/Variant";


export const fetchAllVariants = async () => {
  const response = await api.get<VariantType[]>("/Variant");
  return response.data;
};


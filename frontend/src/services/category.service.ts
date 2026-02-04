import { PaginatedResponse } from "@/types/shared/PaginatedResponse";
import api from "./api";
import type { Category, CreateCategoryInput } from "@/types/Category";
import { endpoints } from "@/utils/endpoints";

export const getPagedCategories = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<Category>> => {
  const response = await api.get<PaginatedResponse<Category>>(
    endpoints.categories.getPaged(page, pageSize)
  );
  return response.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await api.get<Category>(endpoints.categories.getById(id));
  return response.data;
};

export const createCategory = async (
  data: CreateCategoryInput
): Promise<Category> => {
  const response = await api.post<Category>(
    endpoints.categories.create(),
    data
  );
  return response.data;
};

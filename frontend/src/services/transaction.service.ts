import { PaginatedResponse } from "@/types/shared/PaginatedResponse";
import api from "./api";
import type { CreateTransactionInput, Transaction } from "@/types/Transaction";
import { endpoints } from "@/utils/endpoints";

export const getPagedTransactions = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<Transaction>> => {
  const response = await api.get<PaginatedResponse<Transaction>>(
    endpoints.transactions.getPaged(page, pageSize)
  );
  return response.data;
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
  const response = await api.get<Transaction>(
    endpoints.transactions.getById(id)
  );
  return response.data;
};

export const createTransaction = async (
  data: CreateTransactionInput
): Promise<Transaction> => {
  const response = await api.post<Transaction>(
    endpoints.transactions.create(),
    data
  );
  return response.data;
};

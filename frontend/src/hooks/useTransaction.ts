import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { CreateTransactionInput, Transaction } from "@/types/Transaction";
import {
  createTransaction,
  getPagedTransactions,
  getTransactionById,
} from "@/services/transaction.service";

const transactionKeys = {
  all: ["transactions"] as const,
  lists: () => [...transactionKeys.all, "list"] as const,
  list: (page: number, pageSize: number) =>
    [...transactionKeys.lists(), page, pageSize] as const,
  details: () => [...transactionKeys.all, "detail"] as const,
  detail: (id: string) => [...transactionKeys.details(), id] as const,
};

export function useTransactionList(page: number, pageSize: number) {
  return useQuery({
    queryKey: transactionKeys.list(page, pageSize),
    queryFn: () => getPagedTransactions(page, pageSize),
  });
}

export function useTransactionById(
  id: string | undefined,
  options?: Omit<
    UseQueryOptions<
      Transaction,
      Error,
      Transaction,
      ReturnType<typeof transactionKeys.detail>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: transactionKeys.detail(id ?? ""),
    queryFn: () => getTransactionById(id!),
    enabled: !!id,
    ...options,
  });
}

export function useTransactionCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransactionInput) => createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      toast.success("Transação criada com sucesso.");
    },
    onError: (error) => {
      toast.error(error?.message ?? "Erro ao criar transação.");
    },
  });
}

export { transactionKeys };

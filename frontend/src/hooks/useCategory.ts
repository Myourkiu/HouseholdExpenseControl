import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Category, CreateCategoryInput } from "@/types/Category";
import {
  createCategory,
  getPagedCategories,
  getCategoryById,
} from "@/services/category.service";

const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: (page: number, pageSize: number) =>
    [...categoryKeys.lists(), page, pageSize] as const,
  details: () => [...categoryKeys.all, "detail"] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
};

export function useCategoryList(page: number, pageSize: number) {
  return useQuery({
    queryKey: categoryKeys.list(page, pageSize),
    queryFn: () => getPagedCategories(page, pageSize),
  });
}

export function useCategoryById(
  id: string | undefined,
  options?: Omit<
    UseQueryOptions<
      Category,
      Error,
      Category,
      ReturnType<typeof categoryKeys.detail>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: categoryKeys.detail(id ?? ""),
    queryFn: () => getCategoryById(id!),
    enabled: !!id,
    ...options,
  });
}

export function useCategoryCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryInput) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success("Categoria criada com sucesso.");
    },
    onError: (error) => {
      toast.error(error?.message ?? "Erro ao criar categoria.");
    },
  });
}

export { categoryKeys };

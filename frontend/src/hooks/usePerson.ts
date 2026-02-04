import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import type {
  CreatePersonInput,
  Person,
  UpdatePersonInput,
} from "@/types/Person";
import {
  createPerson,
  deletePerson,
  getPagedPersons,
  getPersonById,
  updatePerson,
} from "@/services/person.service";

const personKeys = {
  all: ["persons"] as const,
  lists: () => [...personKeys.all, "list"] as const,
  list: (page: number, pageSize: number) =>
    [...personKeys.lists(), page, pageSize] as const,
  details: () => [...personKeys.all, "detail"] as const,
  detail: (id: string) => [...personKeys.details(), id] as const,
};

export function usePersonList(page: number, pageSize: number) {
  return useQuery({
    queryKey: personKeys.list(page, pageSize),
    queryFn: () => getPagedPersons(page, pageSize),
  });
}

export function usePersonById(
  id: string | undefined,
  options?: Omit<
    UseQueryOptions<
      Person,
      Error,
      Person,
      ReturnType<typeof personKeys.detail>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: personKeys.detail(id ?? ""),
    queryFn: () => getPersonById(id!),
    enabled: !!id,
    ...options,
  });
}

export function usePersonCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePersonInput) =>
      createPerson({ ...data, id: "" } as Person),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: personKeys.all });
      toast.success("Pessoa criada com sucesso.");
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? "Erro ao criar pessoa.");
    },
  });
}

export function usePersonUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePersonInput }) =>
      updatePerson(id, { id, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: personKeys.all });
      toast.success("Pessoa atualizada com sucesso.");
    },
    onError: (error) => {
      toast.error(error?.message ?? "Erro ao atualizar pessoa.");
    },
  });
}

export function usePersonDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deletePerson(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: personKeys.all });
      toast.success("Pessoa excluída com sucesso.");
    },
    onError: (error) => {
      toast.error(error?.message ?? "Erro ao excluir pessoa.");
    },
  });
}

export { personKeys };

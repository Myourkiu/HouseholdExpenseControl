import { z } from "zod";

export const transactionFormSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória").trim(),
  value: z.coerce
    .number({ invalid_type_error: "Informe um valor válido" })
    .min(0.01, "Valor deve ser maior que 0"),
  type: z.coerce
    .number({ invalid_type_error: "Selecione o tipo" }),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  personId: z.string().min(1, "Selecione uma pessoa"),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;

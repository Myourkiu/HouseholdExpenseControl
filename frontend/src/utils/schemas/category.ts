import { z } from "zod";

export const categoryFormSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória").trim(),
  purpose: z.coerce
    .number({ invalid_type_error: "Selecione uma finalidade" })
    .min(1, "Selecione uma finalidade")
    .max(3, "Selecione uma finalidade"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

import { z } from "zod";

export const personFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").trim(),
  age: z.coerce
    .number({ invalid_type_error: "Informe uma idade válida" })
    .min(0, "Idade não pode ser negativa")
    .max(130, "Idade não pode ser maior que 130"),
});

export type PersonFormValues = z.infer<typeof personFormSchema>;

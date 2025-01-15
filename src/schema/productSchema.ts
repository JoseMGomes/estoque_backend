import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  price: z.number().min(0, "O preço deve ser um número positivo"),
  quantity: z.number().int().min(0, "A quantidade deve ser um número inteiro positivo"),
  image: z.string().refine(
    (value) => {
      return value.startsWith("data:image/") && value.includes("base64");
    },
    {
      message: "A imagem deve ser uma string codificada em base64 válida",
    }
  ),
});

export const UpdateProductSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").optional(),
  description: z.string().min(1, "A descrição é obrigatória").optional(),
  price: z.number().min(0, "O preço deve ser um número positivo").optional(),
  quantity: z
    .number()
    .int()
    .min(0, "A quantidade deve ser um número inteiro positivo")
    .optional(),
  image: z.string().optional(),
});

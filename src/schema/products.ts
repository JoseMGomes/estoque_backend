import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  quantity: z.number().min(0), 
});

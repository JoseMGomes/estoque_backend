import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string().refine(
    (value) => {
      return value.startsWith("data:image/") && value.includes("base64");
    },
    {
      message: "Image must be a valid base64-encoded image",
    }
  ),
  quantity: z.number().min(0),
});

import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  quantity: z.number().int().min(0, "Quantity must be a positive integer"),
  image: z.string().refine(
    (value) => {
      return value.startsWith("data:image/") && value.includes("base64");
    },
    {
      message: "Image must be a valid base64-encoded image",
    }
  ),
});

export const UpdateProductSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.number().min(0, "Price must be a positive number").optional(),
  quantity: z
    .number()
    .int()
    .min(0, "Quantity must be a positive integer")
    .optional(),
  image: z.string().optional(),
});

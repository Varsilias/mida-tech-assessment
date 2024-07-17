import { z } from "zod";

export const CreateProductSchema = z
  .object({
    product_name: z.string({
      required_error: "Product name is required",
      invalid_type_error: "Product name must be a string",
    }),

    product_description: z.string({
      required_error: "Product description is required",
      invalid_type_error: "Product description must be a string",
    }),

    product_price: z.coerce
      .number({
        required_error: "Product price is required",
        invalid_type_error: "Product price must be a number",
      })
      .positive("Product price must be a positive integer")
      .min(1, "Product price cannot be below 1"),
  })
  .strict({ message: "Invalid field in body" });

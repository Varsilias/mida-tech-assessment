import { z } from "zod";

export const CreateOrderSchema = z
  .object({
    product_id: z.coerce
      .number({
        required_error: "Product ID is required",
        invalid_type_error: "Product ID must be a number",
      })
      .positive("Product ID must be a positive integer"),

    user_id: z.coerce
      .number({
        required_error: "User ID is required",
        invalid_type_error: "User ID must be a number",
      })
      .positive("User ID must be a positive integer"),
  })
  .strict({ message: "Invalid field in body" });

import { Router } from "express";
import { authCheck, validateRequest } from "../auth/middlewares";
import * as schema from "./schema-validators";
import { REQUEST_FIELD } from "../../../enums/";
import * as ProductController from "./product.controller";

export const productRouter = Router();

productRouter.post(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.BODY, schema.CreateProductSchema),
  ProductController.createProduct,
);

productRouter.get(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.QUERY, schema.PaginationSchema),
  ProductController.getProducts,
);

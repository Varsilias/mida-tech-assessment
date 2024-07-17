import { Router } from "express";
import { authCheck, validateRequest } from "../auth/middlewares";
import * as schema from "./schema-validators";
import { REQUEST_FIELD } from "../../../enums/";
import * as OrderController from "./order.controller";

export const orderRouter = Router();

orderRouter.post(
  "/",
  authCheck,
  validateRequest(REQUEST_FIELD.BODY, schema.CreateOrderSchema),
  OrderController.createOrder,
);

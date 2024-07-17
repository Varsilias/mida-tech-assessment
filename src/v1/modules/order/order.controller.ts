import { Request, Response } from "express";
import { IOrderDto } from "./types";
import * as OrderService from "./order.service";
import { logger } from "../../../config/logger.config";
import { HttpStatus } from "../../../enums";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.body } as IOrderDto;
    const { status, message, data, statusCode } = await OrderService.createNewOrder(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[MidaCoreException] - [ExceptionHandler] - [order.controller.createOrder]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

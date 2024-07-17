import { logger } from "../../../config/logger.config";
import { HttpStatus } from "../../../enums";
import { Request, Response } from "express";
import { IGetProductsDto, IProductDto } from "./types";
import * as ProductService from "./product.service";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.body } as IProductDto;
    const { status, message, data, statusCode } = await ProductService.createNewProduct(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[MidaCoreException] - [ExceptionHandler] - [product.controller.createProduct]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};
export const getProducts = async (req: Request, res: Response) => {
  try {
    const payload = { ...req.query } as unknown as IGetProductsDto;

    const { status, message, data, statusCode } = await ProductService.getProducts(payload);
    return res.status(statusCode).json({ status, message, data });
  } catch (error: any) {
    logger.error(
      `[MidaCoreException] - [ExceptionHandler] - [product.controller.getProducts]: ${error.message}`,
    );
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "Unable to resolve request at this time" });
  }
};

import { HttpStatus } from "../../../enums";
import { ProductRepository } from "./repositories/product.repository";
import { IProductDto } from "./types";

export const createNewProduct = async (payload: IProductDto) => {
  const productExists = await ProductRepository.findOne({
    where: { product_name: payload.product_name },
  });

  if (productExists) {
    return {
      status: false,
      message: "Product already exists, choose a different name",
      statusCode: HttpStatus.CONFLICT,
    };
  }
  const entity = ProductRepository.create(payload);
  const product = await ProductRepository.save(entity);

  return {
    status: true,
    message: "Product created successfully",
    data: product,
    statusCode: HttpStatus.CREATED,
  };
};

export const getProducts = async () => {
  const products = await ProductRepository.find({});

  return {
    status: true,
    message: "Product retrieved successfully",
    data: products,
    statusCode: HttpStatus.OK,
  };
};

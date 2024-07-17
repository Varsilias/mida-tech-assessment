import { HttpStatus } from "../../../enums";
import { ProductRepository } from "./repositories/product.repository";
import { IGetProductsDto, IProductDto } from "./types";

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

export const getProducts = async (payload: IGetProductsDto) => {
  let { page, perPage } = payload;

  page = page * 1 || 1;
  perPage = perPage * 1 || 10;

  const skip = (page - 1) * perPage;
  const products = await ProductRepository.getPaginated(page, perPage, skip);

  return {
    status: true,
    message: "Product retrieved successfully",
    data: products,
    statusCode: HttpStatus.OK,
  };
};

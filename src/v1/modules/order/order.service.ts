import { HttpStatus } from "../../../enums";
import { UserRepository } from "../auth/_user/user.repository";
import { ProductRepository } from "../product/repositories/product.repository";
import { OrderRepository } from "./repositories/order.repository";
import { IOrderDto } from "./types";

export const createNewOrder = async (payload: IOrderDto) => {
  // we can check and prevent duplicate order if there is a need

  //   const orderExists = await OrderRepository.findOne({
  //     where: { product_id: { id: payload.product_id } },
  //   });

  const userExists = await UserRepository.findOne({ where: { id: payload.user_id } });

  if (!userExists) {
    return {
      status: false,
      message: "User not found", // We can be less explicit if there is need
      statusCode: HttpStatus.NOT_FOUND,
    };
  }

  const productExists = await ProductRepository.findOne({ where: { id: payload.product_id } });

  if (!productExists) {
    return {
      status: false,
      message: "Product not found", // We can be less explicit if there is need
      statusCode: HttpStatus.NOT_FOUND,
    };
  }

  const entity = OrderRepository.create({ user_id: userExists, product_id: productExists });
  const order = await OrderRepository.save(entity);

  return {
    status: true,
    message: "Order created successfully", // We can be less explicit if there is need
    statusCode: HttpStatus.CREATED,
    data: order,
  };
};

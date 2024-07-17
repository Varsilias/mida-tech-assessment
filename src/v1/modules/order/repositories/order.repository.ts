import { AppDataSource } from "../../../../database/sql";
import { OrderEntity } from "../entities/order.entity";

export const OrderRepository = AppDataSource.getRepository(OrderEntity).extend({});

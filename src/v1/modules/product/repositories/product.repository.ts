import { AppDataSource } from "../../../../database/sql";
import { ProductEntity } from "../entities/product.entity";

export const ProductRepository = AppDataSource.getRepository(ProductEntity).extend({});

import { AppDataSource } from "../../../../database/sql";
import { ProductEntity } from "../entities/product.entity";

export const ProductRepository = AppDataSource.getRepository(ProductEntity).extend({
  async getPaginated(page: number, perPage: number, skip: number) {
    const totalRecords = await this.count();
    const totalPages = Math.ceil(totalRecords / perPage);
    const data = await this.createQueryBuilder("product")
      .where("product.deleted_at IS NULL")
      .orderBy("product.created_at", "DESC")
      .skip(skip)
      .take(perPage)
      .getMany();

    return {
      page,
      perPage,
      totalPages,
      totalRecords,
      data,
    };
  },
});

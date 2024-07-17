import { BaseEntity } from "../../../../common/base-entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: "products" })
export class ProductEntity extends BaseEntity<ProductEntity> {
  @Column({ type: "varchar" })
  product_name!: string;

  @Column({ type: "text" })
  product_description!: string;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  product_price!: number;
}

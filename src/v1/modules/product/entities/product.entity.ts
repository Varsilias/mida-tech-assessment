import { BaseEntity } from "../../../../common/base-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { OrderEntity } from "../../order/entities/order.entity";

@Entity({ name: "products" })
export class ProductEntity extends BaseEntity<ProductEntity> {
  @Column({ type: "varchar" })
  product_name!: string;

  @Column({ type: "text" })
  product_description!: string;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  product_price!: number;

  @OneToMany(() => OrderEntity, (order) => order.product_id)
  orders!: OrderEntity[];
}

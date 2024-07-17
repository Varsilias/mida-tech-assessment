import { BaseEntity } from "../../../../common/base-entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "../../auth/_user/user.entity";
import { ProductEntity } from "../../product/entities/product.entity";

@Entity({ name: "orders" })
export class OrderEntity extends BaseEntity<OrderEntity> {
  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user_id!: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orders)
  @JoinColumn({ name: "product_id" })
  product_id!: ProductEntity;
}

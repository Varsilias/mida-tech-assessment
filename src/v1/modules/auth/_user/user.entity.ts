import { BaseEntity } from "../../../../common/base-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { OrderEntity } from "../../order/entities/order.entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity<UserEntity> {
  @Column({ type: "varchar" })
  username!: string;

  @Column({ unique: true, type: "varchar" })
  email!: string;

  @Column({ type: "varchar", select: false })
  password!: string;

  @Column({ type: "varchar", select: false })
  salt!: string;

  @OneToMany(() => OrderEntity, (order) => order.user_id)
  orders!: OrderEntity[];

  sanitize() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, salt, ...rest } = this;
    return {
      ...rest,
    };
  }
}

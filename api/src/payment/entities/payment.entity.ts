import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  ForeignKey,
  Model,
  Table,
  DataType,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';

@Table({
  tableName: 'payments',
  updatedAt: false,
})
export class Payment extends Model {
  @ForeignKey(() => Order)
  @Column({ field: 'order_id' })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING, field: 'pi_payement_id' })
  piPaymentId: string;

  @Column({ type: DataType.STRING })
  txid: string;

  @Column({ type: DataType.BOOLEAN })
  paid: string;

  @Column({ type: DataType.BOOLEAN })
  cancelled: boolean;

  @Column({ field: 'created_at' })
  createdAt?: Date;
}

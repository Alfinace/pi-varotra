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
  tableName: 'payments_u2a',
  updatedAt: false,
})
export class PaymentU2A extends Model {
  @ForeignKey(() => Order)
  @Column({ field: 'order_id' })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @Column({ field: 'uid' })
  uid: string;

  @Column({ field: 'memo' })
  memo: string;

  @Column({ field: 'amount', type: DataType.DOUBLE })
  amount: number;

  @Column({ field: 'metadata' })
  metadata: string;


  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING, field: 'pi_payment_id' })
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

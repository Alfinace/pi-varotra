import { Article } from 'src/article/entities/article.entity';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsToMany,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { ArticleOrder } from 'src/aricle-order/entities/aricle-order.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { User } from 'src/user/entities/user.entity';

@Table({ updatedAt: false, tableName: 'orders' })
export class Order extends Model {
  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @BelongsToMany(() => Article, () => ArticleOrder)
  articles: Article[];

  @ForeignKey(() => Payment)
  @Column({ field: 'payment_id' })
  paymentId: number;

  @HasOne(() => Payment)
  payment: Payment;

  @Column({ type: DataType.DECIMAL, field: 'total_amount' })
  totalAmount: number;

  @Column({ type: DataType.DATE, field: 'created_at' })
  delivered?: Date;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt?: Date;
}

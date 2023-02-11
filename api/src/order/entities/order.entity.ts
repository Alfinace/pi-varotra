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
import { PaymentU2A } from 'src/payment-u2-a/entities/payment-u2-a.entity';
import { User } from 'src/user/entities/user.entity';
import { Store } from 'src/store/entities/store.entity';

@Table({ updatedAt: false, tableName: 'orders' })
export class Order extends Model {
  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Store)
  @Column({ field: 'store_id' })
  storeId: number;

  @BelongsTo(() => Store)
  store: Store;


  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Article, () => ArticleOrder)
  articles: Article[];

  @ForeignKey(() => PaymentU2A)
  @Column({ field: 'payment_id' })
  paymentId: number;

  @HasOne(() => PaymentU2A)
  payment: PaymentU2A;

  @Column({ type: DataType.DOUBLE, field: 'total_amount' })
  totalAmount: number;

  @Column({ type: DataType.DATE, field: 'delivered' })
  delivered?: string;

  @Column({ field: 'deliverie_info' })
  deliverieInfo?: string;


  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt?: Date;
}

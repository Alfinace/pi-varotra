import { Article } from 'src/article/entities/article.entity';
import {
  Column,
  ForeignKey,
  Model,
  Table,
  DataType,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from 'src/order/entities/order.entity';

@Table({ updatedAt: false, createdAt: false, tableName: 'article_orders' })
export class ArticleOrder extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Article)
  @Column({ field: 'article_id' })
  articleId: number;

  @BelongsTo(() => Article)
  article: Article;

  @BelongsTo(() => Order)
  order: Order;
  @ForeignKey(() => Order)
  @Column({ field: 'order_id' })
  orderId: number;

  @Column({ type: DataType.INTEGER })
  quantity: number;

  @Column({ type: DataType.DOUBLE })
  unitPrice: number;
}

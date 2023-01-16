import { Article } from 'src/article/entities/article.entity';
import {
  Column,
  ForeignKey,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';
import { Order } from 'src/order/entities/order.entity';

@Table({ updatedAt: false, createdAt: false, tableName: 'article_orders' })
export class ArticleOrder extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Article)
  @Column({ field: 'article_id' })
  articleId: number;

  @ForeignKey(() => Order)
  @Column({ field: 'order_id' })
  orderId: number;

  @Column({ type: DataType.INTEGER })
  quantite: number;

  @Column({ type: DataType.DOUBLE })
  unitPrice: number;
}

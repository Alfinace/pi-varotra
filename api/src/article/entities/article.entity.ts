import { User } from 'src/user/entities/user.entity';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
  AfterCreate,
  BelongsToMany,
} from 'sequelize-typescript';
import { Category } from 'src/category/entities/category.entity';
import { ImageArticle } from 'src/image-article/entities/image-article.entity';
import { Store } from 'src/store/entities/store.entity';
import { Rate } from 'src/rates/entities/rate.entity';
import { ArticleOrder } from 'src/aricle-order/entities/article-order.entity';
import { Order } from 'src/order/entities/order.entity';

@Table({
  tableName: 'articles',
  indexes: [{ unique: true, fields: ['slug'], name: 'idx_slug' }],
})
export class Article extends Model {
  @ForeignKey(() => Store)
  @Column({ field: 'store_id' })
  storeId: number;

  @ForeignKey(() => Category)
  @Column({ field: 'category_id' })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => Store)
  store: Store;

  @BelongsToMany(() => Order, () => ArticleOrder)
  orders: Order[];

  @HasMany(() => Rate)
  rates: Rate[];

  @Column({ allowNull: false, unique: true })
  slug: string;

  @HasMany(() => ImageArticle)
  images: ImageArticle[];

  @Column({ allowNull: false })
  designation: string;

  @Column({ type: DataType.INTEGER })
  stock: number;

  @Column({ field: 'unit_price', type: DataType.DOUBLE, allowNull: false })
  unitPrice: number;
  @Column({ type: DataType.TEXT })
  detail: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  archived: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  published: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  approved: boolean;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt?: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt?: Date;
}

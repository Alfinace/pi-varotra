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
} from 'sequelize-typescript';
import { Category } from 'src/category/entities/category.entity';
import { ImageArticle } from 'src/image-article/entities/image-article.entity';
import { Store } from 'src/store/entities/store.entity';

@Table({ tableName: 'articles' })
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

  @HasMany(() => ImageArticle)
  images: ImageArticle[];

  @Column({ allowNull: false })
  designation: string;

  @Column({ type: DataType.INTEGER })
  stock: number;

  @Column({ field: 'unit_price', type: DataType.DECIMAL, allowNull: false })
  unitPrice: number;
  @Column
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

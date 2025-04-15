import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';

import { Article } from 'src/article/entities/article.entity';
import { ImageUser } from 'src/image-user/entities/image-user.entity';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';

@Table({
  tableName: 'stores',
  updatedAt: false,
})
export class Store extends Model {
  @ForeignKey(() => User)
  @Column({ field: 'user_id', unique: true })
  userId: number;

  @HasMany(() => Article, { foreignKey: 'storeId' })
  articles: Article[];

  @HasMany(() => Order, { foreignKey: 'storeId' })
  orders: Order[];

  @HasMany(() => ImageUser, 'storeId')
  images: ImageUser[];

  @BelongsTo(() => User)
  user: User;

  @Length({
    min: 3,
    max: 50,
    msg: 'Le nom doit contenir entre 3 et 50 caractères',
  })
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  logo: string;

  @Column({ type: DataType.STRING })
  address: string;

  @Column({ type: DataType.STRING })
  city: string;

  @Length({ max: 13, msg: 'Le nom doit 13 caractères' })
  @Column({ type: DataType.STRING })
  contact: string;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'description', type: DataType.TEXT })
  description: string;

  @Column({
    field: 'state',
    type: DataType.ENUM('active', 'inactive', 'blocked'),
    defaultValue: 'inactive',
  })
  state: string;

  @Column({
    field: 'pi_payment_id',
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  piPaymentId: string;
}

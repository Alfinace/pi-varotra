import { User } from 'src/user/entities/user.entity';
import {
  Column,
  ForeignKey,
  Model,
  Table,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Store } from 'src/store/entities/store.entity';

@Table({
  tableName: 'image_users',
})
export class ImageUser extends Model {
  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Store)
  @Column({ field: 'store_id' })
  storeId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => Store, 'storeId')
  store: Store;

  @Column({ field: 'filename' })
  filename: string;

  @Column({ field: 'name' })
  name: string;

  @Column({
    type: DataType.ENUM,
    values: ['cin', 'passport', 'copie', 'other'],
    defaultValue: 'other',
  })
  type: string;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;
}

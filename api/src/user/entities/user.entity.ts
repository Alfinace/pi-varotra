import { Nouveau } from './../../nouveau/entities/nouveau.entity';
import { Article } from 'src/article/entities/article.entity';
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  IsEmail,
  HasOne,
} from 'sequelize-typescript';
import { PaymentU2A } from 'src/payment-u2-a/entities/payment-u2-a.entity';
import { ImageUser } from 'src/image-user/entities/image-user.entity';
import { Store } from 'src/store/entities/store.entity';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    unique: { name: 'username', msg: 'username is already exist' },
    allowNull: true,
  })
  username: string;

  @HasMany(() => Nouveau)
  nouveaux: Nouveau[];

  @Column
  avatar: string;

  @Column({ field: 'uid' })
  uid: string;

  @Column({ field: 'access_token' })
  accessToken: string;

  @IsEmail
  @Column({
    unique: { name: 'email', msg: 'email is already exist' },
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female']
  })
  gender: string;

  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column
  password: string;

  @Column
  contact: string;

  // @Column({ field: 'public_key' })
  // publicKey: string;

  @Column({ type: DataType.DATEONLY, allowNull: true })
  birthday?: Date;

  @Column({
    type: DataType.ENUM,
    values: ['SUPER_ADMIN', 'ARTICLE_CONTROLLER', 'ADMIN', 'USER'],
    defaultValue: 'USER',
  })
  role: string;

  @Column
  address: string;

  @Column
  city: string;

  @Column({ field: 'postal_code' })
  postalCode: string;

  @Column({ field: 'social_network', type: DataType.TEXT })
  socialNetwork: string;

  @Column({
    field: 'verified_email',
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verifiedEmail: boolean;

  @Column({
    field: 'confirm_code_email',

    type: DataType.INTEGER({ length: 4 }),
  })
  confirmCodeEmail: number;

  @Column({ field: 'blocked', type: DataType.BOOLEAN, defaultValue: false })
  blocked: boolean;


  @HasOne(() => Store, { foreignKey: 'userId' })
  store: Store;

  @HasMany(() => ImageUser, { foreignKey: 'userId' })
  images: ImageUser[];

  @HasMany(() => PaymentU2A, { foreignKey: 'userId' })
  payments: PaymentU2A[];

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt?: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt?: Date;
}

import { BelongsTo, Column, DataType, ForeignKey, HasMany, Length, Model, Table } from 'sequelize-typescript';
import { Article } from 'src/article/entities/article.entity';
import { ImageUser } from 'src/image-user/entities/image-user.entity';
import { User } from 'src/user/entities/user.entity';


@Table({
	tableName: 'stores',
	updatedAt: false,
})
export class Store extends Model {

	@ForeignKey(() => User)
	@Column({ field: 'user_id' })
	userId: number;

	@HasMany(() => Article, { foreignKey: 'storeId' })
	articles: Article[];

	@HasMany(() => ImageUser, 'storeId')
	images: ImageUser[];

	@BelongsTo(() => User)
	user: User;

	@Length({ min: 3, max: 50, msg: 'Le nom doit contenir entre 3 et 50 caractères' })
	@Column({ type: DataType.STRING })
	name: string;

	@Column({ type: DataType.STRING })
	logo: string

	@Column({ type: DataType.STRING })
	address: string;

	@Column({ type: DataType.STRING })
	city: string;

	@Length({ max: 13, msg: 'Le nom doit 13 caractères' })
	@Column({ type: DataType.STRING })
	contact: string;

	@Column({ type: DataType.ENUM('pedding', 'active', 'inactive'), defaultValue: 'pedding' })
	status: boolean;

	@Column({ field: 'created_at' })
	createdAt: Date;
}

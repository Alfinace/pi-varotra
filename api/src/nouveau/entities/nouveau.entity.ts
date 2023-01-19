import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";

@Table({ tableName: 'nouveaux' })
export class Nouveau extends Model {

	@ForeignKey(() => User)
	@Column({ field: 'user_id' })
	userId: number;

	@BelongsTo(() => User)
	user: User;

	@Column({ allowNull: false })
	title: string;

	@Column({ allowNull: false })
	subtitle: string;

	@Column
	image: string;

	@Column({ allowNull: false, type: DataType.TEXT })
	detail: string;
}

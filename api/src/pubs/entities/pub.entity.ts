import { Column, Model, Table } from "sequelize-typescript";

@Table({
	tableName: 'pubs',
})
export class Pub extends Model {
	@Column({
		allowNull: false,
	})
	image: string;

	@Column
	link: string;

	@Column({
		field: 'created_at',
	})
	createdAt: Date;

	@Column({
		field: 'updated_at',
	})
	updatedAt: Date;
}

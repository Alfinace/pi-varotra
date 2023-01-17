import { Column, Model, Table } from 'sequelize-typescript';

@Table({
	tableName: 'cities',
	createdAt: false,
	updatedAt: false,
})
export class City extends Model {
	@Column({ unique: true })
	name: string;

}

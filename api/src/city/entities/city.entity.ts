import { Column, Model, Table } from 'sequelize-typescript';

@Table({
	tableName: 'cities',
	createdAt: false,
	updatedAt: false,
  indexes: [{ unique: true, fields: ['name'], name: 'idx_name' }]
})
export class City extends Model {
	@Column({ unique: true })
	name: string;

}

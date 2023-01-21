import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";
import { Article } from "src/article/entities/article.entity";

@Table({
	tableName: 'rates',
})
export class Rate extends Model {
	@Column({
		allowNull: false,
	})
	rate: number;

	@ForeignKey(() => User)
	@Column({
		field: 'user_id',
	})
	userId: number;

	@ForeignKey(() => Article)
	@Column({
		field: 'article_id',
	})
	articleId: number;

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => Article)
	article: Article;

	@Column
	comment: string;

	@Column({
		field: 'created_at',
	})
	createdAt: Date;
	@Column({
		field: 'updated_at',
	})
	updatedAt: Date;
}

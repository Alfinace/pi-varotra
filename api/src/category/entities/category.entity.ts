import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Article } from 'src/article/entities/article.entity';

@Table({
  tableName: 'categories',
  createdAt: false,
  updatedAt: false,
})
export class Category extends Model {
  @Column({ unique: true })
  name: string;

  @Column
  description: string;

  @HasMany(() => Article)
  articles: Article[];
}

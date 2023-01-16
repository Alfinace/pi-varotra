import { Article } from 'src/article/entities/article.entity';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'image_articles',
  createdAt: false,
  updatedAt: false,
})
export class ImageArticle extends Model {
  @ForeignKey(() => Article)
  @Column({ field: 'article_id' })
  articleId: number;

  @Column
  image: string;
}

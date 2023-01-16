import { articleProviders } from './article.providers';
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { DatabaseModule } from 'src/database/database.module';
import { imageArticleProviders } from 'src/image-article/image-article.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [ArticleService, ...articleProviders, ...imageArticleProviders],
})
export class ArticleModule { }

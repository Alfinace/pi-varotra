import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { ImageArticleService } from './image-article.service';
import { imageArticleProviders } from './image-article.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [ImageArticleService, ...imageArticleProviders],
})
export class ImageArticleModule {}

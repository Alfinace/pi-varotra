import { DatabaseModule } from 'src/database/database.module';
import { articleOrderProviders } from './article-order.providers';
import { Module } from '@nestjs/common';
import { ArticleOrderService } from './article-order.service';
import { ArticleOrderController } from './article-order.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleOrderController],
  providers: [ArticleOrderService, ...articleOrderProviders],
})
export class AricleOrderModule {}

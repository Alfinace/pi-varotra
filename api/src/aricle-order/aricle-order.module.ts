import { DatabaseModule } from 'src/database/database.module';
import { articleOrderProviders } from './article-order.providers';
import { Module } from '@nestjs/common';
import { AricleOrderService } from './aricle-order.service';
import { AricleOrderController } from './aricle-order.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AricleOrderController],
  providers: [AricleOrderService, ...articleOrderProviders],
})
export class AricleOrderModule {}

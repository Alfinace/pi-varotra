import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/database/database.module';
import { orderProviders } from './order.providers';
import { articleOrderProviders } from 'src/aricle-order/article-order.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService, ...orderProviders, ...articleOrderProviders],
})
export class OrderModule {}

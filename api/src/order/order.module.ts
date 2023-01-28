import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/database/database.module';
import { orderProviders } from './order.providers';
import { articleOrderProviders } from 'src/aricle-order/article-order.providers';
import { PaymentU2AService } from 'src/payment-u2-a/payment-u2-a.service';
import { paymentU2AProviders } from 'src/payment-u2-a/payment-u2-a.providers';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [OrderController],
  providers: [OrderService, PaymentU2AService, ...paymentU2AProviders, ...orderProviders, ...articleOrderProviders],
})
export class OrderModule { }

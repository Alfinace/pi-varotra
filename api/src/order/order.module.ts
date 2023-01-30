import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/database/database.module';
import { orderProviders } from './order.providers';
import { articleOrderProviders } from 'src/aricle-order/article-order.providers';
import { PaymentU2AService } from 'src/payment-u2-a/payment-u2-a.service';
import { paymentU2AProviders } from 'src/payment-u2-a/payment-u2-a.providers';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PaymentA2UService } from 'src/payement-a2-u/payement-a2-u.service';
import { paymentA2UProviders } from 'src/payement-a2-u/payment-a2-u.providers';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [OrderController],
  providers: [OrderService, PaymentU2AService, PaymentA2UService, ...paymentA2UProviders, ...paymentU2AProviders, ...orderProviders, ...articleOrderProviders],
})
export class OrderModule { }

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PaymentA2UService } from './payement-a2-u.service';
import { paymentA2UProviders } from './payment-a2-u.providers';
import { articleOrderProviders } from 'src/aricle-order/article-order.providers';
import { articleProviders } from 'src/article/article.providers';
import { orderProviders } from 'src/order/order.providers';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [PaymentA2UService, ...paymentA2UProviders, ...articleOrderProviders,...articleProviders, ...orderProviders],
  exports: [PaymentA2UService],
})
export class PayementA2UModule { }

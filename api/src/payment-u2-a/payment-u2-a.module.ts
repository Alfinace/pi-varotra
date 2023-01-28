import { paymentU2AProviders } from './payment-u2-a.providers';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { PaymentU2AService } from './payment-u2-a.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [PaymentU2AService, ...paymentU2AProviders],
  exports: [PaymentU2AService],
})
export class PaymentU2AModule { }

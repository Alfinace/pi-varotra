import { paymentProviders } from './payment.providers';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [PaymentService, ...paymentProviders],
  exports: [PaymentService],
})
export class PaymentModule {}

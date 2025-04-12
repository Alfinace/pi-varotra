import { CityService } from 'src/city/city.service';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { storeProviders } from './store.providers';
import { cityProviders } from 'src/city/city.providers';
import { UserService } from 'src/user/user.service';
import { userProviders } from 'src/user/user.providers';
import { paymentU2AProviders } from 'src/payment-u2-a/payment-u2-a.providers';
import { PaymentU2AService } from 'src/payment-u2-a/payment-u2-a.service';
import { imageUserProviders } from 'src/image-user/image-user.providers';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule,HttpModule],
  controllers: [StoreController],
  providers: [StoreService, CityService, UserService, PaymentU2AService,...imageUserProviders, ...storeProviders, ...cityProviders, ...userProviders, ...paymentU2AProviders],
  exports: [StoreService],
})
export class StoreModule { }

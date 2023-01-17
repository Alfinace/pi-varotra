import { CityService } from 'src/city/city.service';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { storeProviders } from './store.providers';
import { cityProviders } from 'src/city/city.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreController],
  providers: [StoreService, CityService, ...storeProviders, ...cityProviders],
  exports: [StoreService],
})
export class StoreModule { }

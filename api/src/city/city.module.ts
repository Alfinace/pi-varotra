import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cityProviders } from './city.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CityController],
  providers: [CityService, ...cityProviders],
  exports: [CityService],
})
export class CityModule { }

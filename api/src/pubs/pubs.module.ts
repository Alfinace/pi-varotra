import { Module } from '@nestjs/common';
import { PubsService } from './pubs.service';
import { PubsController } from './pubs.controller';
import { pubProviders } from './pubs.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PubsController],
  providers: [PubsService, ...pubProviders],
  exports: [PubsService]
})
export class PubsModule { }

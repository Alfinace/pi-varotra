import { Module } from '@nestjs/common';
import { NouveauService } from './nouveau.service';
import { NouveauController } from './nouveau.controller';
import { nouveauProviders } from './nouveau.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NouveauController],
  providers: [NouveauService, ...nouveauProviders],
  exports: [NouveauService],
})
export class NouveauModule { }

import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { imageUserProviders } from './image-user.providers';
import { ImageUserService } from './image-user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [ImageUserService, ...imageUserProviders],
  exports: [ImageUserService],
})
export class ImageUserModule {}

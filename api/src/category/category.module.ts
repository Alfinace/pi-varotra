import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { categorieProviders } from './category.providers';
import { userProviders } from 'src/user/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService,...userProviders, ...categorieProviders],
})
export class CategoryModule {}

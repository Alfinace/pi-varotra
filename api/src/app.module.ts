import { PaymentModule } from './payment/payment.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { ImageArticleModule } from './image-article/image-article.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { AricleOrderModule } from './aricle-order/aricle-order.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ImageUserModule } from './image-user/image-user.module';
import { StoreModule } from './store/store.module';
import { CityModule } from './city/city.module';
import { NouveauModule } from './nouveau/nouveau.module';
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    UserModule,
    ArticleModule,
    CategoryModule,
    ImageArticleModule,
    OrderModule,
    AricleOrderModule,
    ImageUserModule,
    AuthModule,
    StoreModule,
    PaymentModule,
    CityModule,
    NouveauModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

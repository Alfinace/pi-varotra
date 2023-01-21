import { Nouveau } from './../nouveau/entities/nouveau.entity';
import { Order } from './../order/entities/order.entity';
import { ImageArticle } from 'src/image-article/entities/image-article.entity';
import { Category } from 'src/category/entities/category.entity';
import { Sequelize } from 'sequelize-typescript';
import { Article } from 'src/article/entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import { ArticleOrder } from 'src/aricle-order/entities/aricle-order.entity';
import { ImageUser } from 'src/image-user/entities/image-user.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Store } from 'src/store/entities/store.entity';
import { City } from 'src/city/entities/city.entity';
import { Pub } from 'src/pubs/entities/pub.entity';
import { Rate } from 'src/rates/entities/rate.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([
        User,
        Article,
        Category,
        ImageArticle,
        Order,
        ArticleOrder,
        ImageUser,
        Payment,
        Store,
        City,
        Nouveau,
        Rate,
        Pub,
      ]);
      await sequelize.sync({
        // alter: true,
      });
      return sequelize;
    },
  },
];

import { Nouveau } from './../nouveau/entities/nouveau.entity';
import { Order } from './../order/entities/order.entity';
import { ImageArticle } from 'src/image-article/entities/image-article.entity';
import { Category } from 'src/category/entities/category.entity';
import { Sequelize } from 'sequelize-typescript';
import { Article } from 'src/article/entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import { ArticleOrder } from 'src/aricle-order/entities/aricle-order.entity';
import { ImageUser } from 'src/image-user/entities/image-user.entity';
import { PaymentU2A } from 'src/payment-u2-a/entities/payment-u2-a.entity';
import { Store } from 'src/store/entities/store.entity';
import { City } from 'src/city/entities/city.entity';
import { Pub } from 'src/pubs/entities/pub.entity';
import { Rate } from 'src/rates/entities/rate.entity';
import { PayementA2U } from 'src/payement-a2-u/entities/payement-a2-u.entity';
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
        PaymentU2A,
        PayementA2U,
        Store,
        City,
        Nouveau,
        Rate,
        Pub,
      ]);
      await sequelize.sync({
        // alter: true,
        // force: true,
      });
      return sequelize;
    },
  },
];

import { ArticleOrder } from './entities/aricle-order.entity';

export const articleOrderProviders = [
  {
    provide: 'ARTICLE_ORDER_REPOSITORY',
    useValue: ArticleOrder,
  },
];

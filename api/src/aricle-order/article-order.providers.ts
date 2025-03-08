import { ArticleOrder } from './entities/article-order.entity';

export const articleOrderProviders = [
  {
    provide: 'ARTICLE_ORDER_REPOSITORY',
    useValue: ArticleOrder,
  },
];

import { Article } from './entities/article.entity';

export const articleProviders = [
  {
    provide: 'ARTICLE_REPOSITORY',
    useValue: Article,
  },
];

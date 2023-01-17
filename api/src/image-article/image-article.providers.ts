import { ImageArticle } from 'src/image-article/entities/image-article.entity';

export const imageArticleProviders = [
  {
    provide: 'IMAGE_ARTICLE_REPOSITORY',
    useValue: ImageArticle,
  },
];

import { Category } from 'src/category/entities/category.entity';

export const categorieProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useValue: Category,
  },
];

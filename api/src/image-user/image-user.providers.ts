import { ImageUser } from './entities/image-user.entity';

export const imageUserProviders = [
  {
    provide: 'IMAGE_USER_REPOSITORY',
    useValue: ImageUser,
  },
];

import { Store } from "./entities/store.entity";

export const storeProviders = [
  {
    provide: 'STORE_REPOSITORY',
    useValue: Store,
  },
];

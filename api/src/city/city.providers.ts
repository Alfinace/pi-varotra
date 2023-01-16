import { City } from "./entities/city.entity";

export const cityProviders = [
  {
    provide: 'CITY_REPOSITORY',
    useValue: City,
  },
];

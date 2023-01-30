import { PayementA2U } from "./entities/payement-a2-u.entity";

export const paymentA2UProviders = [
  {
    provide: 'PAYMENTA2U_REPOSITORY',
    useValue: PayementA2U,
  },
];

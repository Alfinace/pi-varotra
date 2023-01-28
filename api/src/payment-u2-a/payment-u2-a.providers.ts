import { PaymentU2A } from './entities/payment-u2-a.entity';

export const paymentU2AProviders = [
  {
    provide: 'PAYMENTU2A_REPOSITORY',
    useValue: PaymentU2A,
  },
];

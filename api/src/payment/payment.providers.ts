import { Payment } from './entities/payment.entity';

export const paymentProviders = [
  {
    provide: 'PAYMENT_REPOSITORY',
    useValue: Payment,
  },
];

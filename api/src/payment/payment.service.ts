import { Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private paymentRepository: typeof Payment,
    private readonly httpService: HttpService,
  ) { }
  create(createPaymentDto: CreatePaymentDto) { }

  //Part implementation  payment Pi Network
  getInfoPayment(paymentId) {
    return this.httpService.get(
      `${process.env.API_URL_MINEPi}/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Key ${process.env.API_KEY_MINEPI}`,
        },
      },
    );
  }

  getExactInfoUser(accessToken) {
    return this.httpService.get(`${process.env.API_URL_MINEPi}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  approvePayment(paymentId): Observable<any> {
    return this.httpService.post(
      `${process.env.API_URL_MINEPi}/payments/${paymentId}/approve`,
      {},
      {
        headers: {
          Authorization: `Key ${process.env.API_KEY_MINEPI}`,
        },
      },
    );
  }

  completePayment(paymentId): Observable<any> {
    return this.httpService.post(
      `${process.env.API_URL_MINEPi}/payments/${paymentId}/complete`,
      {},
      {
        headers: {
          Authorization: `Key ${process.env.API_KEY_MINEPI}`,
        },
      },
    );
  }

  getMyInfo(accessToken: string): Observable<any> {
    return this.httpService.get(
      `${process.env.API_URL_MINEPi}/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }
}

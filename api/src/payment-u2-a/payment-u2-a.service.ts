import { catchError, map, Observable } from 'rxjs';
import { ForbiddenException, HttpException, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PaymentU2A } from './entities/payment-u2-a.entity';

@Injectable()
export class PaymentU2AService {
  private pi;
  constructor(
    @Inject('PAYMENTU2A_REPOSITORY')
    private paymentRepository: typeof PaymentU2A,
    private readonly httpService: HttpService,
  ) {

  }
  create(data) {
    return this.paymentRepository.create(data);
  }

  // USER TO APP payment Pi Network

  update(paymentId: any, data) {
    return this.paymentRepository.update(data, { where: { piPaymentId: paymentId } });
  }

  getPaymentU2A(paymentId) {
    return this.paymentRepository.findOne({ where: { piPaymentId: paymentId } });
  }

  //Part implementation  payment Pi Network
  getInfoPayment(paymentId):  Observable<any> {
    return this.httpService.get(
      `${process.env.API_URL_MINEPI}/v2/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Key ${process.env.API_KEY_MINEPI}`,
        },
      },
    ).pipe(
      map((res) => {
        return res;
      }),
    )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }


  approvePayment(paymentId): Observable<any> {
    return this.httpService.post(
      `${process.env.API_URL_MINEPI}/v2/payments/${paymentId}/approve`,
      {},
      {
        headers: {
          Authorization: `Key ${process.env.API_KEY_MINEPI}`,
        },
      },
    ).pipe(
      map((res) => {
        return res;
      }),
    )
      .pipe(
        catchError((err) => {
          console.log(err);

          throw new HttpException(err, 400);
        }),
      );
  }

  completePayment(paymentId, txid): Observable<any> {
    return this.httpService.post(
      `${process.env.API_URL_MINEPI}/v2/payments/${paymentId}/complete`,
      { txid },
      {
        headers: {
          Authorization: `Key ${process.env.API_KEY_MINEPI}`,
        },
      },
    ).pipe(
      map((res) => {
        return res;
      }),
    )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );;
  }

  getMyInfo(accessToken: string): Observable<any> {
    return this.httpService.get(
      `${process.env.API_URL_MINEPI}/v2/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ).pipe(
      map((res) => {
        return res;
      }),
    )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );;
  }



  // APP TO USER payment Pi Network


}

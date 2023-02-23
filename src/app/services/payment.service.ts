import { HttpService } from 'src/app/services/http.service';
import { Injectable } from '@angular/core';
import { PaymentDTO } from '../models/payment.dto.model';
import { AuthResult } from '../models/auth-result';
import { Order } from '../models/order.model';
import { BehaviorSubject } from 'rxjs';

type PaymentData = {
  amount: number,
  memo: string,
  metadata: Object,
};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private statePayement: BehaviorSubject<any> = new BehaviorSubject(null);
  public statePayement$ = this.statePayement.asObservable();
  private Pi: any = window.Pi;
  private scopes: string[] = ['username', 'payments'];
  constructor(private http: HttpService) { }

  public auth(): Promise<any> {
    return this.Pi.authenticate(this.scopes, this.onIncompletePaymentFound)
  }

  public onIncompletePaymentFound = (payment: PaymentDTO) => {
    return this.http.post('/payments/incomplete', { payment });
  }


  /**
   * createPayment
   */
  public async createPayment(data: PaymentData) {
    await this.auth();
    return new Promise(async (resolve, reject) => {
      const payment = await this.Pi.createPayment(data, {
        onReadyForServerApproval: (paymentId: any) => {
          this.onReadyForServerApproval(paymentId);
        },
        onReadyForServerCompletion: (paymentId: string, txid: string) => {
          this.onReadyForServerCompletion(paymentId, txid);
          this.statePayement.next({ status: 'success', paymentId, txid });
        },
        onCancel: (paymentId: string) => {
          this.onCancel(paymentId);
          this.statePayement.next({ status: 'cancelled' });
        },
        onError: (error: Error, payment: PaymentDTO | undefined) => {
          this.onError(error, payment);
          this.statePayement.next({ status: 'error' });
        },
      });
      return payment;
    });
  }

  public onReadyForServerApproval(paymentId: string) {
    this.http.post('orders/payments/approve', { paymentId }).toPromise().then((res: any) => {
      console.log('Response', res);
    });
  }

  public onReadyForServerCompletion(paymentId: string, txid: string) {
    this.http.post('orders/payments/complete', { paymentId, txid }).toPromise().then((res: any) => {
    });;
  }

  public onCancel(paymentId: string) {
    this.http.post('orders/payments/cancelled_payment', { paymentId }).toPromise().then((res: any) => {
    });;
  }

  public onError(error: Error, payment?: PaymentDTO) {
    console.log("onError", error);
    if (payment) {
      console.log(payment);
    }
  }

  public addOrder(order: Order) {
    return this.http.post('orders', { ...order });
  }

}

import { HttpService } from 'src/app/services/http.service';
import { Injectable } from '@angular/core';
import { PaymentDTO } from '../models/payment.dto.model';
import { AuthResult } from '../models/auth-result';
import { Order } from '../models/order.model';

type PaymentData = {
  amount: number,
  memo: string,
  metadata: Object,
};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
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
    const payment = await this.Pi.createPayment(data, {
      onReadyForServerApproval: (paymentId: any) => {
        this.onReadyForServerApproval(paymentId);
      },
      onReadyForServerCompletion: (paymentId: string, txid: string) => {
        this.onReadyForServerCompletion(paymentId, txid);
      },
      onCancel: (paymentId: string) => {
        this.onCancel(paymentId);
      },
      onError: (error: Error, payment: PaymentDTO | undefined) => {
        this.onError(error, payment);
      },
    });
  }

  public onReadyForServerApproval(paymentId: string) {
    console.log("Ready Approval", paymentId);
    this.http.post('orders/payments/approve', { paymentId }).toPromise().then((res: any) => {
      console.log('Response', res);
    });
  }

  public onReadyForServerCompletion(paymentId: string, txid: string) {
    console.log("Ready Completion", paymentId, txid);
    this.http.post('orders/payments/complete', { paymentId, txid }).toPromise().then((res: any) => {
      console.log('Response', res);
    });;
  }

  public onCancel(paymentId: string) {
    console.log("Annullé", paymentId);
    this.http.post('orders/payments/cancelled_payment', { paymentId }).toPromise().then((res: any) => {
      console.log('Response', res);
    });;
  }

  public onError(error: Error, payment?: PaymentDTO) {
    console.log("onError", error);
    if (payment) {
      console.log(payment);
      // handle the error accordingly
    }
  }

  public addOrder(order: Order) {
    return this.http.post('orders', { ...order });
  }

}

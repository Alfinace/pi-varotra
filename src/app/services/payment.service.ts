import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { HttpService } from 'src/app/services/http.service';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { PaymentDTO } from '../models/payment.dto.model';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

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
  private scopes: string[] = ['username', 'payments', 'wallet_address'];
  constructor(
    private http: HttpService,
    private router: Router,
    private toastService: ToastService,
    private cartService: CartService
  ) { }

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
          this.cartService.removeAllCart()
          this.router.navigate(['space-client'])
          this.toastService.show('success', 'Paiement effectué avec succès')
          resolve(true);
        },
        onCancel: (paymentId: string) => {
          reject(false);
          this.toastService.show('danger', 'Paiement annulé')
        },
        onError: (error: Error, payment: PaymentDTO | undefined) => {
          this.onError(error, payment);
          this.toastService.show('danger', 'Erreur lors du paiement')
          reject(false);
        },
      });
      return payment;
    });
  }

  public onReadyForServerApproval(paymentId: string) {
    this.http.post('orders/payments/approve', { paymentId }).toPromise().then((res: any) => {
    });
  }

  public onReadyForServerCompletion(paymentId: string, txid: string) {
    this.http.post('orders/payments/complete', { paymentId, txid }).toPromise().then((res: any) => {
    });
  }

  public onCancel(paymentId: string) {
    this.http.post('orders/payments/cancelled_payment', { paymentId }).toPromise().then((res: any) => {
    });
  }

  public onError(error: Error, payment?: PaymentDTO) {
    if (payment) {
      console.log(payment);
    }
  }


  public async createPaymentStore(data: PaymentData) {
    await this.auth();
    return new Promise(async (resolve, reject) => {
      const payment = await this.Pi.createPayment(data, {
        onReadyForServerApproval: (paymentId: any) => {
          this.onReadyForServerApprovalStore(paymentId);
        },
        onReadyForServerCompletion: (paymentId: string, txid: string) => {
          this.onReadyForServerCompletionStore(paymentId, txid);
          this.toastService.show('success', 'Votre paiement a été effectué avec succès, desormais votre boutique est active et visible au public')
          resolve(true);
        },
        onCancel: (paymentId: string) => {
          reject(false);
          this.toastService.show('danger', 'Paiement annulé')
        },
        onError: (error: Error, payment: PaymentDTO | undefined) => {
          this.onError(error, payment);
          this.toastService.show('danger', 'Erreur lors du paiement')
          reject(false);
        },
      });
      return payment;
    });
  }
  public onReadyForServerApprovalStore(paymentId: string) {
    this.http.post('stores/payments/approve', { paymentId }).toPromise().then((res: any) => {
    });
  }

  public onReadyForServerCompletionStore(paymentId: string, txid: string) {
    this.http.post('stores/payments/complete', { paymentId, txid }).toPromise().then((res: any) => {
    });
  }

  public onCancelStore(paymentId: string) {
    this.http.post('stores/payments/cancelled_payment', { paymentId }).toPromise().then((res: any) => {
    });
  }

  public addOrder(order: Order) {
    return this.http.post('orders', { ...order });
  }

}

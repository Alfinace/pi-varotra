import { HttpService } from 'src/app/services/http.service';
import { Injectable } from '@angular/core';
import { PaymentDTO } from '../models/payment.dto.model';
import { AuthResult } from '../models/auth-result';

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
}

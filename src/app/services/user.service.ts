import { HttpService } from 'src/app/services/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  public sendEmail(email: string) {
    return this.http.post('send-email', { email });
  }

  public confirmEmail(email: string, code: string) {
    return this.http.post('confirm-email', { email, code });
  }

  public resendCode(email: string) {
    return this.http.post('resend-code', { email });
  }

  public save(payload: { email: string, password: string, firstname: string, lastname: string }) {
    return this.http.post('user/complete-register', { ...payload });
  }
}

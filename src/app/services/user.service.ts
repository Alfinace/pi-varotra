import { BehaviorSubject } from 'rxjs';
import { AuthResult } from './../models/auth-result';
import { HttpService } from 'src/app/services/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private hasStore$: BehaviorSubject<any> = new BehaviorSubject<boolean>(false)
  public hasStoreObservable = this.hasStore$.asObservable()
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

  public login(data: any) {
    return this.http.post('auth/login', { ...data });
  }

  updateUser(value: any) {
    return this.http.put('user/update', { ...value });
  }

  saveCIN(value: any) {
    return this.http.post('user/image', { ...value });
  }

  updatePassword(value: { password: string, oldPassword: string }) {
    return this.http.put('user/update-password', { ...value });
  }
  createStore(value: any) {
    return this.http.post('stores', { ...value });
  }

  getAllUsers(page: number, size: number) {
    return this.http.get('user?page=' + page + '&size=' + size);
  }

  setHasStore(hasStore: boolean) {
    this.hasStore$.next(hasStore)
  }
}

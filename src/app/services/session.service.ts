import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpService } from './http.service';
import { LocalstorageService } from './localstorage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})


export class SessionService {
  public user: User | undefined = {} as User;
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  private userInfoSubject = new ReplaySubject<any>();
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  public userInfo = this.userInfoSubject.asObservable();

  constructor(
    private httpService: HttpService,
    private _router: Router,
    private localStorageService: LocalstorageService
  ) { }

  getSessionStatus(): Observable<boolean> {
    return Observable.create(async (observer: any) => {
      try {
        const token: string = this.localStorageService.getItem('token');

        if (!token) {
          this.logout();
          observer.next(false);
        } else {
          await this.initSession(token);
          observer.next(true);
        }
      } catch (e) {
        observer.next(false);
      }
      observer.complete();
    });

  }

  async initSession(token: string): Promise<any> {
    this.localStorageService.setItem('token', token);
    try {
      // Check if token is expired
      if (jwt.isTokenExpired(token)) {
        this.logout()
        return;
      }

      const decodedToken = jwt.decodeToken(token);
      // Retrieve user data
      if (!this.user || !this.user.id) {
        let user = (await this.httpService.get(`/current-me`).toPromise()).user;
        const autorisations: string[] = [];
        // Set current user data into observable
        this.setAuth(user);
      }
    } catch (e) {
      console.error(e);
    }
  }

  forgotPassword(data: any): Observable<any> {
    return this.httpService.post('forgot', data);
  }

  public logout(): void {
    this.localStorageService.removeItem('token');
    this.purgeAuth();
  }


  setAuth(user: User): void {
    // Set current user
    this.userInfoSubject.next(user)
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth(): void {
    // Set current user to an empty object
    this.user = undefined;
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  public getInfoUser() {
    return this.httpService.get(`/current-me`)
  }

  updateInfoUser(user: any): void {
    this.userInfoSubject.next(user)
  }
}

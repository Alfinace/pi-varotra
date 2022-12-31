import { map } from 'rxjs/operators';
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(
    private _sessionService: SessionService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._sessionService
      .getSessionStatus()
      .pipe(take(1), map((x) => {
        if (x) {
          this._router.navigate(['/home'])
          return false;
        } else {
          return true;
        }
      }));
  }
}

import { map, take } from 'rxjs/operators';
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
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
        if (!x) {
          this._router.navigate(['/login'])
          return false;
        } else {
          return true
        }
      })
      );
  }
}

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
  ): Promise<boolean> {
    return this._sessionService
      .getSessionStatus()
      .then((x) => {
        if (!x) {
          var url = '';
          for (let index = 0; index < route.url.length; index++) {
            const element = route.url[index];
            url += '/' + element.path;
          }
          this._router.navigateByUrl('/login?redirectTo=' + url);
          return false;
        } else {
          return true;
        }
      })
  }
}

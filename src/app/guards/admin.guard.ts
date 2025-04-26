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
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private _sessionService: SessionService,
    private _toastService: ToastService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this._sessionService
      .getInfoUser().toPromise()
      .then((user) => {
        let isAdmin = user && user.role === 'ADMIN';
        if (!isAdmin) {
          this._toastService.show('danger', 'Vous n\'avez pas le droit d\'accès sur ce page');
          this._router.navigate(['/']);
        }
        return isAdmin;
      })
  }
}

/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalstorageService } from '../services/localstorage.service';
import { SessionService } from '../services/session.service';
import { ToastService } from '../services/toast.service';

const getOptions = (token: string) => ({ Authorization: `Bearer ${token}` });
@Injectable({
	providedIn: 'root',
})
export class BasicAuthInterceptor implements HttpInterceptor {
	constructor(
		private _localStorageService: LocalstorageService,
		private toastService: ToastService,
		private sessionService: SessionService
	) { }
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// add authorization header with bearer auth credentials if available
		const token: string =
			this._localStorageService.getItem('token')
		if (token) {
			request = request.clone({
				setHeaders: getOptions(token),
			});
		}

		return next.handle(request).pipe(
			catchError((err) => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 401) {
						// redirect user to the logout page
						this.sessionService.logout()
					}

					if (err?.error?.error?.message) {
						switch (err?.error?.error?.message) {
							case 'Email or Username are already taken':
								// eslint-disable-next-line @typescript-eslint/quotes
								this.toastService.show('danger', "L'e-mail  est déjà pris");
								break;

							case 'user_not_found':
								this.toastService.show('danger', 'Utilisateur non trouvé');
								break;

							case 'code_not_valid':
								this.toastService.show('danger', 'Code non valide');
								break;

							case 'invalid':
								this.toastService.show('danger',
									'Erreur depuis le serveur. Merci de contacter admin.'
								);
								break;

							default:
							// code block
						}
					}
				}
				return throwError(err);
			})
		);
	}
}

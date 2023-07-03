import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private _authService: AuthService,
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = this._authService.getToken;

        request = this._addTokenToRequestHeaders(request, token);

        return next.handle(request)
            .pipe(catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this._handle401Error(request, next);
                }

                return throwError(() => new Error(error));
            }));
    }

    private _handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return EMPTY
    }

    private _addTokenToRequestHeaders(request: HttpRequest<unknown>, token: string | null | unknown): HttpRequest<unknown> {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}
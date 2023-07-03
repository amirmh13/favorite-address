import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SwalService } from '../services/swal/swal.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private _swalService: SwalService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpEvent<any>) => {

        if (err instanceof HttpErrorResponse && err.status !== 401) {
          this._swalService.error(err.error.message || '');
        }

        return throwError(err);

      })
    )
  }


}

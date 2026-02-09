import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorNormalizerService } from '../api/error-normalizer.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorNormalizer: ErrorNormalizerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const normalizedError = this.errorNormalizer.normalize(error);
        return throwError(() => normalizedError);
      })
    );
  }
}

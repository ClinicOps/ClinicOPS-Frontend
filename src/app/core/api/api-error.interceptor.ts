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
import { AuthService } from '../auth/auth.service';
import { ClinicContextService } from '../clinic/clinic-context.service';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private clinicContext: ClinicContextService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers;

    const token = this.auth.getToken();
    const clinicId = this.clinicContext.getClinicId();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    if (clinicId) {
      headers = headers.set('X-Clinic-Id', clinicId);
    }

    const authReq = req.clone({ headers });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.auth.clear();
        }
        return throwError(() => error);
      })
    );
  }
}

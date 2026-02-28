import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ClinicContextService } from '../clinic/clinic-context.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const token = auth.getAccessToken();

  if (!token) {
    console.warn('[apiInterceptor] No token found, request sent without Authorization header', req.url);
    return next(req);
  }

  console.log('[apiInterceptor] Token found, adding Authorization header for', req.url);
  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(cloned);
};

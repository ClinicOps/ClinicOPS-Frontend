import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ClinicContextService } from '../clinic/clinic-context.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const clinicContext = inject(ClinicContextService);

  let headers = req.headers;

  const token = auth.getToken();
  const clinicId = clinicContext.getClinicId();

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  if (clinicId) {
    headers = headers.set('X-Clinic-Id', clinicId);
  }

  const cloned = req.clone({ headers });

  return next(cloned);
};

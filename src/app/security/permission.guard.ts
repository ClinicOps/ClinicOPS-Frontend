import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { PermissionService } from './permission.service';
import { Permission } from './permission.enum';

export const permissionGuard = (
  route: ActivatedRouteSnapshot
): boolean | UrlTree => {

  const permissionService = inject(PermissionService);
  const router = inject(Router);

  const required: Permission[] = route.data?.['permissions'];

  // No permissions declared → allow
  if (!required || required.length === 0) {
    return true;
  }

  const hasAll = required.every(p => permissionService.has(p));

  if (!hasAll) {
    return router.createUrlTree(['/']);
  }

  return true;
};

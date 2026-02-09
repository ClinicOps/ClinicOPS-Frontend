import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { PermissionService } from './permission.service';
import { Permission } from './permission.enum';

export const adminGuard = (): boolean | UrlTree => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  const isAdmin = permissionService.has(Permission.ADMIN_READ);

  if (isAdmin) {
    return true;
  }

  return router.createUrlTree(['/']);
};

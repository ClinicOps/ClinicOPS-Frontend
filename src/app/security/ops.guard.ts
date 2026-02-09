import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { PermissionService } from './permission.service';
import { Permission } from './permission.enum';

export const opsGuard = (): boolean | UrlTree => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  const isOps = permissionService.has(Permission.OPS_EXECUTE);

  if (isOps) {
    return true;
  }

  return router.createUrlTree(['/']);
};

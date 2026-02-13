import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionService } from './permission.service';
import { PermissionString } from './permission.types';

export function permissionGuard(
  required: PermissionString | PermissionString[]
): CanActivateFn {

  return () => {
    const permissions = inject(PermissionService);
    const router = inject(Router);

     // ⬅️ THIS IS THE FIX
  if (!permissions.isReady()) {
    return true; // allow navigation, page will self-gate
  }

    const allowed = Array.isArray(required)
      ? permissions.hasAny(required)
      : permissions.has(required);

    if (!allowed) {
      router.navigateByUrl('/forbidden');
      return false;
    }

    return true;
  };
}

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionService } from './permission.service';
import { PermissionString } from './permission.types';

export function permissionGuard(
  required: PermissionString | PermissionString[]
): CanActivateFn {

  return async () => {
    const permissions = inject(PermissionService);
    const router = inject(Router);

    // If permissions haven't loaded yet, wait for them
    if (!permissions.loaded()) {
      // Wait up to 5 seconds for permissions to load
      const maxAttempts = 50; // 50 * 100ms = 5 seconds
      let attempts = 0;

      while (!permissions.loaded() && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500));
        attempts++;
      }

      // If still not loaded after timeout, deny access
      if (!permissions.loaded()) {
        console.error('Permissions failed to load within timeout');
        router.navigateByUrl('/forbidden');
        return false;
      }
    }

    // Now check if user has the required permission
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

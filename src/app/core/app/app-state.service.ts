import { Injectable, computed, inject } from '@angular/core';
import { MeService } from '../auth/me.service';
import { PermissionService } from '../permissions/permission.service';

@Injectable({ providedIn: 'root' })
export class AppStateService {

  private readonly me = inject(MeService);
  private readonly permissions = inject(PermissionService);

  /**
   * App is ready when:
   * - /me has completed
   * - permissions have loaded (or user is anonymous)
   */
  readonly ready = computed(() => {
    if (!this.me.loaded()) return false;

    // if user has clinic context, permissions must be loaded
    if (this.me.clinicId()) {
      return this.permissions.loaded();
    }

    // anonymous / no-clinic case
    return true;
  });
}

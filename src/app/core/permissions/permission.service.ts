import { Injectable, signal, computed, effect } from '@angular/core';
import { PermissionString } from './permission.types';
import { ApiClient } from '../api/api-client';
import { MeService } from '../auth/me.service';

@Injectable({ providedIn: 'root' })
export class PermissionService {

  private readonly _permissions = signal<Set<PermissionString>>(new Set());
  private readonly _loaded = signal(false);

  readonly permissions = computed(() => this._permissions());
  readonly loaded = computed(() => this._loaded());

  constructor(
  private api: ApiClient,
  private me: MeService
) {
  effect(() => {
  if (
    this.me.loaded() &&
    this.me.clinicId() &&
    !this._loaded()
  ) {
    this.loadPermissions();
  }
});
}

  loadPermissions(): void {
    console.log('[PermissionService] Loading permissions from /me/permissions');
    this.api
      .get<PermissionString[]>('/me/permissions')
      .subscribe({
        next: (perms) => {
          console.log('[PermissionService] Permissions loaded:', perms);
          this._permissions.set(new Set(perms));
          this._loaded.set(true);
        },
        error: (error) => {
          console.error('[PermissionService] Error loading permissions:', error);
          // Set as loaded even on error to prevent infinite waiting
          this._loaded.set(true);
        }
      });
  }

  has(permission: PermissionString): boolean {
    const perms = this._permissions();
    // Wildcard "*" means all permissions (OWNER role)
    if (perms.has('*' as PermissionString)) {
      return true;
    }
    return perms.has(permission);
  }

  hasAny(perms: PermissionString[]): boolean {
    const current = this._permissions();
    // Wildcard "*" means all permissions
    if (current.has('*' as PermissionString)) {
      return true;
    }
    return perms.some(p => current.has(p));
  }
}

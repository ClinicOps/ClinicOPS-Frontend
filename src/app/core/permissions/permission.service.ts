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
    this.api
      .get<PermissionString[]>('/me/permissions')
      .subscribe(perms => {
        this._permissions.set(new Set(perms));
        this._loaded.set(true);
      });
  }

  has(permission: PermissionString): boolean {
    return this._permissions().has(permission);
  }

  hasAny(perms: PermissionString[]): boolean {
    const current = this._permissions();
    return perms.some(p => current.has(p));
  }
}

import { Injectable } from '@angular/core';
import { ApiClient } from '../api/api-client';
import { PermissionString } from './permission.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PermissionService {

  public permissions$ = new BehaviorSubject<Set<PermissionString>>(new Set());
  private loaded = false;

  constructor(private api: ApiClient) {}

  loadPermissions(clinicId: string) {
    this.api
      .get<PermissionString[]>(`/me/permissions`)
      .subscribe(perms => {
        this.permissions$.next(new Set(perms));
        this.loaded = true;
      });
  }

  isReady(): boolean {
  return this.loaded;
}

  has(permission: PermissionString): boolean {
    return this.permissions$.value.has(permission);
  }

  hasAny(perms: PermissionString[]): boolean {
    return perms.some(p => this.permissions$.value.has(p));
  }

  clear() {
    this.permissions$.next(new Set());
  }
}

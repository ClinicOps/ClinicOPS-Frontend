import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { AvailabilityApi } from './availability.api';
import { DoctorAvailability, DoctorAvailabilityException } from './types';
import { PermissionService } from '../../../core/permissions/permission.service';
import { AVAILABILITY_PERMISSIONS } from './permissions';

@Injectable({ providedIn: 'root' })
export class AvailabilityFacade {
  private permissionService = inject(PermissionService);
  private api = inject(AvailabilityApi);

  readonly canView = computed(() => this.permissionService.has(AVAILABILITY_PERMISSIONS.VIEW));
  readonly canCreate = computed(() => this.permissionService.has(AVAILABILITY_PERMISSIONS.CREATE));
  readonly canUpdate = computed(() => this.permissionService.has(AVAILABILITY_PERMISSIONS.UPDATE));
  readonly canDelete = computed(() => this.permissionService.has(AVAILABILITY_PERMISSIONS.DELETE));

  private readonly _availabilities = signal<DoctorAvailability[]>([]);
  readonly availabilities = computed(() => this._availabilities());

  constructor() {
    effect(() => {
      if (this.canView()) {
        this.load();
      }
    });
  }

  load(): void {
    this.api.getByDoctor('current').subscribe((data) => {
      this._availabilities.set(data);
    });
  }

  loadDoctorAvailability(doctorId: string) {
    if (this.canView()) {
      return this.api.getByDoctor(doctorId);
    }
    return null;
  }

  create(payload: DoctorAvailability) {
    if (this.canCreate()) {
      return this.api.create(payload);
    }
    return null;
  }

  update(id: string, payload: DoctorAvailability) {
    if (this.canUpdate()) {
      return this.api.update(id, payload);
    }
    return null;
  }

  deactivate(id: string) {
    if (this.canDelete()) {
      return this.api.deactivate(id);
    }
    return null;
  }

  //Exceptions

  getExceptions(doctorId: string, from: string, to: string) {
    if (this.canView()) {
      return this.api.getExceptions(doctorId, from, to);
    }
    return null;
  }

  createException(payload: DoctorAvailabilityException) {
    if (this.canCreate()) {
      return this.api.createException(payload);
    }
    return null;
  }

  updateException(id: string, payload: DoctorAvailabilityException) {
    if (this.canUpdate()) {
      return this.api.updateException(id, payload);
    }
    return null;
  }

  deleteException(id: string) {
    if (this.canDelete()) {
      return this.api.deleteException(id);
    }
    return null;
  }
}

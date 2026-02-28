import { Injectable, inject, signal, computed, effect } from '@angular/core';

import { PermissionService } from '../../../core/permissions/permission.service';
import { APPOINTMENT_PERMISSIONS } from './permissions';
import { AppointmentApi, AppointmentDto } from './services/appointment.api';

@Injectable({ providedIn: 'root' })
export class AppointmentFacade {

  private api = inject(AppointmentApi);
  private permissions = inject(PermissionService);

  // state
  private readonly _appointments = signal<AppointmentDto[]>([]);
  readonly appointments = computed(() => this._appointments());

  // permissions
  readonly canView = computed(() =>
    this.permissions.has(APPOINTMENT_PERMISSIONS.VIEW)
  );

  readonly canCreate = computed(() =>
    this.permissions.has(APPOINTMENT_PERMISSIONS.CREATE)
  );

  readonly canUpdate = computed(() =>
    this.permissions.has(APPOINTMENT_PERMISSIONS.UPDATE)
  );

  constructor() {
    // reactively load when permission becomes available
      effect(() => {
        if (this.canView()) {
          this.load();
        }
      });
  }

  load(): void {
    if (!this.canView()) return;
    this.api.list().subscribe(data => {
      this._appointments.set(data);
    });
  }

  create(payload: { patientId: string; scheduledAt: string }): void {
    if (!this.canCreate()) return;
    this.api.create(payload).subscribe(() => {
      this.load();
    });
  }

  cancel(id: string): void {
    if (!this.canUpdate()) return;
    this.api.cancel(id).subscribe(() => {
      this.load();
    });
  }
}

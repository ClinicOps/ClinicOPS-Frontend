import { Injectable, inject, computed, effect } from '@angular/core';
import { PermissionService } from '../../../core/permissions/permission.service';
import { DOCTOR_PERMISSIONS } from './permissions';
import { DoctorApi } from './doctor.api';
import { DoctorsStore } from './doctors.store';

@Injectable({ providedIn: 'root' })
export class DoctorsFacade {
  private permissionService = inject(PermissionService);
  private api = inject(DoctorApi);
  private store = inject(DoctorsStore);

  readonly canView = computed(() => this.permissionService.has(DOCTOR_PERMISSIONS.VIEW));
  readonly canCreate = computed(() => this.permissionService.has(DOCTOR_PERMISSIONS.CREATE));
  readonly canUpdate = computed(() => this.permissionService.has(DOCTOR_PERMISSIONS.UPDATE));
  readonly canArchive = computed(() => this.permissionService.has(DOCTOR_PERMISSIONS.ARCHIVE));
  readonly canChangeStatus = computed(() => this.permissionService.has(DOCTOR_PERMISSIONS.STATUS_CHANGE));

  constructor() {
    effect(() => {
      if (this.canView()) {
        this.loadDoctors();
      }
    });
  }

  loadDoctors() {
    if (!this.canView()) return;
    this.store.setLoading(true);

    const filters = this.store.filters();
    const page = this.store.page();
    const size = this.store.size();

    const params: any = {
      page,
      size
    };

    if (filters.search) params.search = filters.search;
    if (filters.specialization) params.specialization = filters.specialization;
    if (filters.status) params.status = filters.status;
    if (filters.available !== '') params.available = filters.available;

    this.api.list(params).subscribe({
      next: (res: any) => {
        this.store.setDoctors(res.data.content);
        this.store.setPagination(
          res.data.totalElements,
          res.data.totalPages
        );
        this.store.setLoading(false);
      },
      error: () => this.store.setLoading(false)
    });
  }

  createDoctor(payload: any) {
    if (!this.canCreate()) return null;
    return this.api.create(payload);
  }

  updateDoctor(id: string, payload: any) {
    if (!this.canUpdate()) return null;
    return this.api.update(id, payload);
  }

  archiveDoctor(id: string) {
    if (!this.canArchive()) return null;
    return this.api.archive(id);
  }

  changeStatus(id: string, payload: any) {
    if (!this.canChangeStatus()) return null;
    return this.api.changeStatus(id, payload);
  }
}
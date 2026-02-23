import { Injectable } from '@angular/core';
import { DoctorApi } from './doctor.api';
import { DoctorsStore } from './doctors.store';

@Injectable({ providedIn: 'root' })
export class DoctorsFacade {

  constructor(
    private api: DoctorApi,
    private store: DoctorsStore
  ) {}

  loadDoctors() {
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
    return this.api.create(payload);
  }

  updateDoctor(id: string, payload: any) {
    return this.api.update(id, payload);
  }

  archiveDoctor(id: string) {
    return this.api.archive(id);
  }

  changeStatus(id: string, payload: any) {
    return this.api.changeStatus(id, payload);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientsStore } from './patients.store';
import { PageResponse, Patient } from './types';
import { ApiClient } from '../../core/api/api-client';
import { MeService } from '../../core/auth/me.service';

@Injectable({ providedIn: 'root' })
export class PatientsFacade {
  private store = new PatientsStore();

  patients = this.store.patients;
  loading = this.store.loading;
  totalElements = this.store.totalElements;

  totalPages = this.store.totalPages;
  page = this.store.page;
  size = this.store.size;

  query = this.store.query;
  status = this.store.status;

  constructor(
    private api: ApiClient,
    private me: MeService,
  ) {}

  load() {
    const clinicId = this.me.clinicId();
    if (!clinicId) return;

    const page = this.store.page();
    const size = this.store.size();
    const query = this.store.query();
    const status = this.store.status();

    this.store.loading.set(true);

    this.api
      .get<
        PageResponse<Patient>
      >(`/api/clinics/${clinicId}/patients?page=${page}&size=${size}&query=${query}&status=${status}`)
      .subscribe((res) => {
        this.store.patients.set(res.content);
        this.store.totalElements.set(res.totalElements);
        this.store.totalPages.set(res.totalPages);
        this.store.loading.set(false);
      });
  }

  create(body: any) {
    const clinicId = this.me.clinicId();
    return this.api.post(`/api/clinics/${clinicId}/patients`, body);
  }

  getById(id: string) {
    const clinicId = this.me.clinicId();
    return this.api.get<Patient>(`/api/clinics/${clinicId}/patients/${id}`);
  }

  update(id: string, body: any) {
    const clinicId = this.me.clinicId();
    return this.api.put(`/api/clinics/${clinicId}/patients/${id}`, body);
  }

  archive(id: string) {
    const clinicId = this.me.clinicId();
    return this.api.patch(`/api/clinics/${clinicId}/patients/${id}/archive`, {});
  }

  activate(id: string) {
    const clinicId = this.me.clinicId();
    return this.api.patch(`/api/clinics/${clinicId}/patients/${id}/activate`, {});
  }

  setQuery(q: string) {
    this.store.query.set(q);
  }

  setStatus(s: 'ACTIVE' | 'ARCHIVED' | 'ALL') {
    this.store.status.set(s);
  }

  resetPage() {
    this.store.page.set(0);
  }

  nextPage() {
    this.store.page.update((p) => p + 1);
  }

  prevPage() {
    this.store.page.update((p) => Math.max(0, p - 1));
  }
}

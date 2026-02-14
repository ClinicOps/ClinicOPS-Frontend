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

  constructor(
    private api: ApiClient,
    private me: MeService,
  ) {}

  load(page = 0, size = 10) {
    const clinicId = this.me.clinicId();
    if (!clinicId) return;

    this.store.loading.set(true);

    this.api
      .get<PageResponse<Patient>>(`/api/clinics/${clinicId}/patients?page=${page}&size=${size}`)
      .subscribe((res) => {
        this.store.patients.set(res.content);
        this.store.totalElements.set(res.totalElements);
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
}

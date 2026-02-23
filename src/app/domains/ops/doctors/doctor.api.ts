import { Injectable } from '@angular/core';
import { ApiClient } from '../../../core/api/api-client';
import { ClinicContextService } from '../../../core/clinic/clinic-context.service';
import { Doctor, CreateDoctorRequest } from './types';

@Injectable({ providedIn: 'root' })
export class DoctorApi {

  constructor(
    private api: ApiClient,
    private clinicContext: ClinicContextService
  ) {}

  private base() {
    const clinicId = this.clinicContext.getClinicId();
    return `/api/clinics/${clinicId}/doctors`;
  }

  list(params: any = {}) {
    return this.api.get<any>(this.base(), { params });
  }

  get(id: string) {
    return this.api.get<any>(`${this.base()}/${id}`);
  }

  create(payload: CreateDoctorRequest) {
    return this.api.post(this.base(), payload);
  }

  update(id: string, payload: any) {
    return this.api.put(`${this.base()}/${id}`, payload);
  }

  changeStatus(id: string, payload: any) {
    return this.api.patch(`${this.base()}/${id}/status`, payload);
  }

  archive(id: string) {
    return this.api.delete(`${this.base()}/${id}`);
  }
}
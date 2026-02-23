import { Injectable } from '@angular/core';
import { ApiClient } from '../../../core/api/api-client';
import { DoctorAvailability, DoctorAvailabilityException } from './types';

@Injectable({ providedIn: 'root' })
export class AvailabilityApi {

  constructor(private api: ApiClient) {}

  getByDoctor(doctorId: string) {
    return this.api.get<DoctorAvailability[]>(
      `/availability/doctor/${doctorId}`
    );
  }

  create(payload: DoctorAvailability) {
    return this.api.post(`/availability`, payload);
  }

  update(id: string, payload: DoctorAvailability) {
    return this.api.put(`/availability/${id}`, payload);
  }

  deactivate(id: string) {
    return this.api.delete(`/availability/${id}`);
  }

  // Exceptions

getExceptions(doctorId: string, from: string, to: string) {
  return this.api.get<DoctorAvailabilityException[]>(
    `/availability/exceptions?doctorId=${doctorId}&from=${from}&to=${to}`
  );
}

createException(payload: DoctorAvailabilityException) {
  return this.api.post(`/availability/exceptions`, payload);
}

updateException(id: string, payload: DoctorAvailabilityException) {
  return this.api.put(`/availability/exceptions/${id}`, payload);
}

deleteException(id: string) {
  return this.api.delete(`/availability/exceptions/${id}`);
}
}
import { Injectable } from '@angular/core';
import { ApiClient } from '../../../../core/api/api-client';

export interface AppointmentDto {
  id: string;
  patientNameSnapshot: string;
  scheduledAt: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class AppointmentApi {

  constructor(private api: ApiClient) {}

  list() {
    return this.api.get<AppointmentDto[]>('/ops/appointments');
  }

  create(payload: { patientId: string; scheduledAt: string }) {
    return this.api.post<void>('/ops/appointments', payload);
  }

  cancel(appointmentId: string) {
    return this.api.delete<void>(`/ops/appointments/${appointmentId}`);
  }

  getDoctorSlots(doctorId: string, date: string) {
  return this.api.get<any[]>(
    `/doctors/${doctorId}/slots?date=${date}`
  );
}
}

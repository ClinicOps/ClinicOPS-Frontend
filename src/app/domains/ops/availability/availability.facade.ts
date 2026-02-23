import { Injectable } from '@angular/core';
import { AvailabilityApi } from './availability.api';
import { DoctorAvailability, DoctorAvailabilityException } from './types';

@Injectable({ providedIn: 'root' })
export class AvailabilityFacade {

  constructor(private api: AvailabilityApi) {}

  loadDoctorAvailability(doctorId: string) {
    return this.api.getByDoctor(doctorId);
  }

  create(payload: DoctorAvailability) {
    return this.api.create(payload);
  }

  update(id: string, payload: DoctorAvailability) {
    return this.api.update(id, payload);
  }

  deactivate(id: string) {
    return this.api.deactivate(id);
  }

  //Exceptions

  getExceptions(doctorId: string, from: string, to: string) {
  return this.api.getExceptions(doctorId, from, to);
}

createException(payload: DoctorAvailabilityException) {
  return this.api.createException(payload);
}

updateException(id: string, payload: DoctorAvailabilityException) {
  return this.api.updateException(id, payload);
}

deleteException(id: string) {
  return this.api.deleteException(id);
}
}
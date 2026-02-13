import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClinicContextService {
  private readonly KEY = 'clinicops_clinic';

  setClinicId(clinicId: string) {
    localStorage.setItem(this.KEY, clinicId);
  }

  getClinicId(): string | null {
    return localStorage.getItem(this.KEY);
  }

  clear() {
    localStorage.removeItem(this.KEY);
  }
}

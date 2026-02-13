import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClinicContextService {

  private readonly KEY = 'clinicops_clinic';
  private platformId = inject(PLATFORM_ID);

  setClinicId(clinicId: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.KEY, clinicId);
    }
  }

  getClinicId(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem(this.KEY);
  }

  clear() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.KEY);
    }
  }
}

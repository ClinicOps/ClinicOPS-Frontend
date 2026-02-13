import { Injectable } from '@angular/core';
import { ApiClient } from '../api/api-client';
import { ClinicContextService } from '../clinic/clinic-context.service';
import { PermissionService } from '../permissions/permission.service';

@Injectable({ providedIn: 'root' })
export class MeService {

  constructor(
    private api: ApiClient,
    private clinicContext: ClinicContextService,
    private permissions: PermissionService
  ) {}

  bootstrap() {
    // Always call /me first
  this.api.get<{ userId: string; clinicId: string }>('/me')
    .subscribe(response => {

      // clinicId comes from backend, not localStorage
      const clinicId = response.clinicId;

      if (clinicId) {
        this.clinicContext.setClinicId(clinicId);
        this.permissions.loadPermissions(clinicId);
      }
    });
}
}

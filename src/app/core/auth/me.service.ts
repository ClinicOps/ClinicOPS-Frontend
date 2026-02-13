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
    const clinicId = this.clinicContext.getClinicId();
    if (!clinicId) return;

    this.api.get<{ userId: string; clinicId: string }>('/me')
      .subscribe(() => {
        this.permissions.loadPermissions(clinicId);
      });
  }
}

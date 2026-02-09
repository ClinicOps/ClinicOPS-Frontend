import { Routes } from '@angular/router';
import { ClinicListComponent } from './pages/clinic-list/clinic-list.component';
import { Permission } from '../../security';

export const clinicRoutes: Routes = [
  {
    path: ':workspaceId/clinics',
    component: ClinicListComponent,
     data: {
      permissions: [Permission.CLINIC_MANAGE]
    }
  }
];

import { Routes } from '@angular/router';
import { ClinicListComponent } from './pages/clinic-list/clinic-list.component';

export const clinicRoutes: Routes = [
  {
    path: ':workspaceId/clinics',
    component: ClinicListComponent
  }
];

import { Routes } from '@angular/router';
import { AppointmentListPage } from './domains/ops/appointments/pages/appointment-list.page';
import { permissionGuard } from './core/permissions/permission.guard';
import { APPOINTMENT_PERMISSIONS } from './domains/ops/appointments/permissions';
import { ForbiddenPage } from '../shared/components/forbidden.page';

export const routes: Routes = [
  {
    path: 'ops/appointments',
    component: AppointmentListPage,
    canActivate: [
      permissionGuard(APPOINTMENT_PERMISSIONS.VIEW)
    ]
  },
  {
    path: 'forbidden',
    component: ForbiddenPage
  },
  {
    path: '',
    redirectTo: 'ops/appointments',
    pathMatch: 'full'
  }
];

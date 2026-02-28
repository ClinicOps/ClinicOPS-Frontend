import { Routes } from '@angular/router';
import { AppointmentCreatePage } from './pages/appointment-create.page';
import { AppointmentListPage } from './pages/appointment-list.page';
import { permissionGuard } from '../../../core/permissions/permission.guard';
import { APPOINTMENT_PERMISSIONS } from './permissions';

export const APPOINTMENT_ROUTES: Routes = [
  {
    path: '',
    component: AppointmentListPage,
    canActivate: [permissionGuard(APPOINTMENT_PERMISSIONS.VIEW)]
  },
  {
    path: 'new',
    component: AppointmentCreatePage,
    canActivate: [permissionGuard(APPOINTMENT_PERMISSIONS.CREATE)]
  },
];

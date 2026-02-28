import { Routes } from '@angular/router';
import { WeeklySchedulePage } from './pages/weekly-schedule.page';
import { ExceptionsPage } from './pages/exceptions.page';
import { permissionGuard } from '../../../core/permissions/permission.guard';
import { AVAILABILITY_PERMISSIONS } from './permissions';

export const AVAILABILITY_ROUTES: Routes = [
  {
    path: ':doctorId/availability',
    component: WeeklySchedulePage,
     canActivate: [permissionGuard(AVAILABILITY_PERMISSIONS.VIEW)]
  },
  {
    path: ':doctorId/exceptions',
    component: ExceptionsPage,
     canActivate: [permissionGuard(AVAILABILITY_PERMISSIONS.VIEW)]
  }
];
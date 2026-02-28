import { Routes } from '@angular/router';
import { DoctorsListPage } from './pages/doctors-list.page';
import { DoctorCreatePage } from './pages/doctor-create.page';
import { DoctorEditPage } from './pages/doctor-edit.page';
import { permissionGuard } from '../../../core/permissions/permission.guard';
import { DOCTOR_PERMISSIONS } from './permissions';

export const DOCTORS_ROUTES: Routes = [
  { path: '', component: DoctorsListPage, canActivate: [permissionGuard(DOCTOR_PERMISSIONS.VIEW)] },
  {
    path: 'create',
    component: DoctorCreatePage,
    canActivate: [permissionGuard(DOCTOR_PERMISSIONS.CREATE)],
  },
  {
    path: ':id/edit',
    component: DoctorEditPage,
    canActivate: [permissionGuard(DOCTOR_PERMISSIONS.UPDATE)],
  },
];

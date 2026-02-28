import { Routes } from '@angular/router';
import { PatientsListPage } from './pages/patients-list.page';
import { PatientCreatePage } from './pages/patient-create.page';
import { PatientEditPage } from './pages/patient-edit.page';
import { permissionGuard } from '../../../core/permissions/permission.guard';
import { PATIENTS_PERMISSIONS } from './permissions';

export const PATIENTS_ROUTES: Routes = [
  {
    path: '',
    component: PatientsListPage,
    canActivate: [permissionGuard(PATIENTS_PERMISSIONS.VIEW)]
  },
  {
    path: 'create',
    component: PatientCreatePage,
    canActivate: [permissionGuard(PATIENTS_PERMISSIONS.CREATE)]
  },
  {
    path: ':id/edit',
    component: PatientEditPage,
    canActivate: [permissionGuard(PATIENTS_PERMISSIONS.UPDATE)]
  },
];

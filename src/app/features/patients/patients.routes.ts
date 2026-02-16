import { Routes } from '@angular/router';
import { PatientsListPage } from './pages/patients-list.page';
import { PatientCreatePage } from './pages/patient-create.page';
import { PatientEditPage } from './pages/patient-edit.page';

export const PATIENTS_ROUTES: Routes = [
  {
    path: 'new',
    component: PatientCreatePage,
  },
  {
    path: ':id/edit',
    component: PatientEditPage,
  },
  {
    path: '',
    component: PatientsListPage,
  },
];

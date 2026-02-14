import { Routes } from '@angular/router';
import { PatientsListPage } from './pages/patients-list.page';
import { PatientCreatePage } from './pages/patient-create.page';


export const PATIENTS_ROUTES: Routes = [
  {
    path: '',
    component: PatientsListPage
  },
  {
    path: 'new',
    component: PatientCreatePage
  }
];

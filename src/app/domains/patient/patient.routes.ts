import { Routes } from '@angular/router';
import { PatientListComponent } from './pages/patient-list/patient-list.component';

export const patientRoutes: Routes = [
  {
    path: ':workspaceId/clinics/:clinicId/patients',
    component: PatientListComponent
  }
];

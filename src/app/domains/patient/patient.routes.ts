import { Routes } from '@angular/router';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { Permission } from '../../security';

export const patientRoutes: Routes = [
  {
    path: ':workspaceId/clinics/:clinicId/patients',
    component: PatientListComponent,
    data: {
      permissions: [Permission.PATIENT_READ]
    }
  }
];

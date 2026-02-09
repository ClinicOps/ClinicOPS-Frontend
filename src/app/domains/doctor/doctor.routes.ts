import { Routes } from '@angular/router';
import { DoctorListComponent } from './pages/doctor-list/doctor-list.component';
import { Permission } from '../../security';

export const doctorRoutes: Routes = [
  {
    path: ':workspaceId/clinics/:clinicId/doctors',
    component: DoctorListComponent,
     data: {
      permissions: [Permission.DOCTOR_READ]
    }
  },
];

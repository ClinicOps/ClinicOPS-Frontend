import { Routes } from '@angular/router';
import { AppointmentListPage } from './domains/ops/appointments/pages/appointment-list.page';
import { permissionGuard } from './core/permissions/permission.guard';
import { APPOINTMENT_PERMISSIONS } from './domains/ops/appointments/permissions';
import { AVAILABILITY_ROUTES } from './domains/ops/availability/availability.routes';
import { ForbiddenPage } from '../shared/components/forbidden.page';
import { RegisterComponent } from './core/auth/register/register.component';
import { LoginComponent } from './core/auth/login/login.component';
import { ClinicSetupPage } from './core/clinic/setup/clinic-setup.page';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
  path: 'setup-clinic',
  component: ClinicSetupPage
},
  {
    path: 'ops/appointments',
    component: AppointmentListPage,
    canActivate: [permissionGuard(APPOINTMENT_PERMISSIONS.VIEW)]
  },
  {
    path: 'ops/doctors',
    loadChildren: () =>
      import('./domains/ops/doctors/doctors.routes')
        .then(m => m.DOCTORS_ROUTES)
  },
  {
    path: 'ops/availability',
    loadChildren: () =>
      import('./domains/ops/availability/availability.routes')
        .then(m => m.AVAILABILITY_ROUTES)
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./domains/ops/patients/patients.routes')
        .then(m => m.PATIENTS_ROUTES)
  },
  {
    path: 'forbidden',
    component: ForbiddenPage
  },
  {
    path: '',
    redirectTo: 'ops/appointments',
    pathMatch: 'full',
  }
];

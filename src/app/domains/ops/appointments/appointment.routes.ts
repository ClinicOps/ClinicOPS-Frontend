import { Routes } from '@angular/router';
import { AppointmentCreatePage } from './pages/appointment-create.page';
import { AppointmentListPage } from './pages/appointment-list.page';

export const PATIENTS_ROUTES: Routes = [
  {
    path: 'new',
    component: AppointmentCreatePage,
  },
  {
    path: '',
    component: AppointmentListPage,
  },
];

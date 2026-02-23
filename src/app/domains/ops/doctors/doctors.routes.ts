import { Routes } from '@angular/router';
import { DoctorsListPage } from './pages/doctors-list.page';
import { DoctorCreatePage } from './pages/doctor-create.page';
import { DoctorEditPage } from './pages/doctor-edit.page';

export const DOCTORS_ROUTES: Routes = [
  { path: '', component: DoctorsListPage },
  { path: 'create', component: DoctorCreatePage },
  { path: ':id/edit', component: DoctorEditPage }
];

import { Routes } from '@angular/router';
import { WeeklySchedulePage } from './pages/weekly-schedule.page';
import { ExceptionsPage } from './pages/exceptions.page';

export const AVAILABILITY_ROUTES: Routes = [
  {
    path: ':doctorId/availability',
    component: WeeklySchedulePage
  },
  {
    path: ':doctorId/exceptions',
    component: ExceptionsPage
  }
];
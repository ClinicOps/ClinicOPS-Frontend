import { Routes } from '@angular/router';
import { adminGuard } from '../../security/admin.guard';

export const adminClinicRoutes: Routes = [
  {
    path: 'clinics',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/admin-clinic-list/admin-clinic-list.component')
        .then(m => m.AdminClinicListComponent)
  }
];

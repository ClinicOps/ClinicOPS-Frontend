import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shell/admin-layout.component';
import { adminGuard } from '../security/admin.guard';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/admin-home/admin-home.component')
            .then(m => m.AdminHomeComponent)
      }
    ]
  }
];

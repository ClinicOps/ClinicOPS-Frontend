import { Routes } from '@angular/router';
import { adminGuard } from '../security/admin.guard';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./admin-placeholder.component')
            .then(m => m.AdminPlaceholderComponent)
      }
    ]
  }
];

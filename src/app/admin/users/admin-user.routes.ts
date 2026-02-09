import { Routes } from '@angular/router';
import { adminGuard } from '../../security/admin.guard';

export const adminUserRoutes: Routes = [
  {
    path: 'users',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/admin-user-list/admin-user-list.component')
        .then(m => m.AdminUserListComponent)
  }
];

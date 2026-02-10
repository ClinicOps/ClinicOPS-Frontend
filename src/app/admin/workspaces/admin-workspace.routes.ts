import { Routes } from '@angular/router';
import { adminGuard } from '../../security/admin.guard';

export const adminWorkspaceRoutes: Routes = [
  {
    path: 'workspaces',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/admin-workspace-list/admin-workspace-list.component')
        .then(m => m.AdminWorkspaceListComponent)
  }
];

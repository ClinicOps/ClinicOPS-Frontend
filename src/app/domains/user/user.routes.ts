import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { Permission } from '../../security';

export const userRoutes: Routes = [
  {
    path: ':workspaceId/users',
    component: UserListComponent,
    data: {
      permissions: [Permission.ADMIN_READ]
    }
  }
];

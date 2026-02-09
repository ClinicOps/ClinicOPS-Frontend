import { Routes } from '@angular/router';
import { WorkspaceListComponent } from './pages/workspace-list/workspace-list.component';
import { Permission } from '../../security';

export const workspaceRoutes: Routes = [
  {
    path: '',
    component: WorkspaceListComponent,
    data: {
      permissions: [Permission.CLINIC_MANAGE]
    }
  }
];

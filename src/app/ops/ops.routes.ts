import { Routes } from '@angular/router';
import { opsGuard } from '../security/ops.guard';
import { OpsLayoutComponent } from './shell/ops-layout.component';

export const opsRoutes: Routes = [
  {
    path: 'ops',
    component: OpsLayoutComponent,
    canActivate: [opsGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/ops-home/ops-home.component')
            .then(m => m.OpsHomeComponent)
      }
    ]
  }
];

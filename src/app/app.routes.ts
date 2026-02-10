import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './shell/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shell/layout/layout.component';
import { permissionGuard } from './security/permission.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [permissionGuard],
    children: [
      {
        path: 'workspaces',
        loadChildren: () =>
          import('./domains/workspace/workspace.routes').then(
            (m) => m.workspaceRoutes,
          ),
      },
      {
        path: 'workspaces',
        loadChildren: () =>
          import('./domains/clinic/clinic.routes').then((m) => m.clinicRoutes),
      },
      {
        path: 'workspaces',
        loadChildren: () =>
          import('./domains/doctor/doctor.routes').then((m) => m.doctorRoutes),
      },
      {
        path: 'workspaces',
        loadChildren: () =>
          import('./domains/patient/patient.routes').then(
            (m) => m.patientRoutes,
          ),
      },
      {
        path: 'workspaces',
        loadChildren: () =>
          import('./domains/user/user.routes').then((m) => m.userRoutes),
      },
      {
        path: '',
        loadChildren: () =>
          import('./admin/workspaces/admin-workspace.routes').then(
            (m) => m.adminWorkspaceRoutes,
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./admin/clinics/admin-clinic.routes').then(
            (m) => m.adminClinicRoutes,
          ),
      },
    ],
  },
  {
    path: '',
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.adminRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./ops/ops.routes').then((m) => m.opsRoutes),
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('./shared/components/forbidden/forbidden.component').then(
        (m) => m.ForbiddenComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

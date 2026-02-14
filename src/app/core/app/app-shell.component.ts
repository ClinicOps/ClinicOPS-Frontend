import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStateService } from './app-state.service';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [CommonModule, RouterOutlet],
  template: `
    <ng-container *ngIf="app.ready(); else loading">
      <router-outlet />
    </ng-container>

    <ng-template #loading>
      <div class="app-loading">
        <p>Loading ClinicOps…</p>
      </div>
    </ng-template>
  `
})
export class AppShellComponent {
  readonly app = inject(AppStateService);
}

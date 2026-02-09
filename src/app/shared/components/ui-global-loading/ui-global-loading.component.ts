import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'ui-global-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="global-loading" *ngIf="loading$ | async">
      Loading…
    </div>
  `,
  styles: [`
    .global-loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 6px;
      text-align: center;
      background: #2563eb;
      color: white;
      font-size: 12px;
      z-index: 1000;
    }
  `]
})
export class UiGlobalLoadingComponent {
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}

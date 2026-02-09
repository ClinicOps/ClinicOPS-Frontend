import { Component } from '@angular/core';

@Component({
  selector: 'ui-loading',
  standalone: true,
  template: `
    <div class="loading">
      Loading…
    </div>
  `,
  styles: [`
    .loading {
      padding: 24px;
      text-align: center;
      color: #666;
    }
  `]
})
export class UiLoadingComponent {}

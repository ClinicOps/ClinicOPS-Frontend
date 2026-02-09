import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-page-header',
  standalone: true,
  template: `
    <div class="page-header">
      <div class="titles">
        <h1>{{ title }}</h1>
        <p *ngIf="subtitle">{{ subtitle }}</p>
      </div>

      <div class="actions">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .titles h1 {
      margin: 0;
      font-size: 20px;
    }
    .titles p {
      margin: 0;
      color: #666;
      font-size: 13px;
    }
    .actions {
      display: flex;
      gap: 8px;
    }
  `]
})
export class UiPageHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
}

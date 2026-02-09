import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="empty">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .empty {
      text-align: center;
      padding: 32px;
      color: #666;
    }
    h3 {
      margin-bottom: 4px;
    }
  `]
})
export class UiEmptyStateComponent {
  @Input() title!: string;
  @Input() description?: string;
}

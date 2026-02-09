import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [disabled]="disabled || loading"
      [class]="variant">
      <span *ngIf="loading">⏳</span>
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    button {
      padding: 6px 12px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-size: 13px;
    }
    .primary { background: #2563eb; color: white; }
    .secondary { background: #e5e7eb; color: black; }
    .danger { background: #dc2626; color: white; }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class UiButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() loading = false;
  @Input() disabled = false;
}

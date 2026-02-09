import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-error',
  standalone: true,
  template: `
    <div class="error">
      {{ message }}
    </div>
  `,
  styles: [`
    .error {
      padding: 16px;
      background: #fee2e2;
      color: #991b1b;
      border-radius: 6px;
    }
  `]
})
export class UiErrorComponent {
  @Input() message = 'Something went wrong';
}

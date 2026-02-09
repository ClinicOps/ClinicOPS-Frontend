import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" *ngIf="toast">
      {{ toast.message }}
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      bottom: 16px;
      right: 16px;
      padding: 12px 16px;
      background: #111827;
      color: white;
      border-radius: 6px;
    }
  `]
})
export class UiToastComponent {

  toast: any;

  constructor(private notifications: NotificationService) {
    this.notifications.notifications$.subscribe(t => {
      this.toast = t;
      setTimeout(() => this.toast = null, 3000);
    });
  }
}

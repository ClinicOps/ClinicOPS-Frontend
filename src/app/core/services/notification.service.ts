import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private subject = new Subject<Notification>();
  notifications$ = this.subject.asObservable();

  success(message: string) {
    this.subject.next({ message, type: 'success' });
  }

  error(message: string) {
    this.subject.next({ message, type: 'error' });
  }

  info(message: string) {
    this.subject.next({ message, type: 'info' });
  }
}

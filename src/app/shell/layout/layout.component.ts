import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';

import { SessionService } from '../../core/services/session.service';
import { NotificationService } from '../../core/services/notification.service';

import { UiGlobalLoadingComponent } from '../../shared/components/ui-global-loading/ui-global-loading.component';
import { UiToastComponent } from '../../shared/components/ui-toast/ui-toast.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    UiGlobalLoadingComponent,
    UiToastComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  private routerSub?: Subscription;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationError) {
        this.notificationService.error('Navigation failed');
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  logout(): void {
    this.sessionService.logout();
    this.router.navigate(['/auth/login']);
  }
}

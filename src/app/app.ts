import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MeService } from './core/auth/me.service';

import { isPlatformBrowser } from '@angular/common';
import { filter, take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {

   private router = inject(Router);
  private me = inject(MeService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        take(1) // 🔥 only once
      )
      .subscribe(() => {
        this.me.bootstrap();
      });
  }
}

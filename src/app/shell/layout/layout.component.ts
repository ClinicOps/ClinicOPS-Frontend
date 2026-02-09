import { Component } from '@angular/core';
import { SessionService } from '../../core/services/session.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(private sessionService: SessionService, private router: Router) {}

  logout(): void {
    this.sessionService.logout();
    this.router.navigate(['/auth/login']);
  }
}

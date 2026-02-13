import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MeService } from './core/auth/me.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {

  private me = inject(MeService);

  ngOnInit(): void {
    this.me.bootstrap();
  }
}

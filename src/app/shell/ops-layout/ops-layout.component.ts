import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ops-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h2>OPS Console</h2>
    <router-outlet></router-outlet>
  `
})
export class OpsLayoutComponent {}

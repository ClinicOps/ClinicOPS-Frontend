import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ops-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './ops-layout.component.html',
  styleUrls: ['./ops-layout.component.scss']
})
export class OpsLayoutComponent {}

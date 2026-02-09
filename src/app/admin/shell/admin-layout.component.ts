import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

import { ADMIN_NAV_ITEMS } from '../navigation/admin-nav.config';
import { HasPermissionDirective } from '../../security';

@Component({
  selector: 'admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor, HasPermissionDirective],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  navItems = ADMIN_NAV_ITEMS;
}

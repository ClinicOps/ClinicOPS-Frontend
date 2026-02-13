import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-forbidden-page',
  imports: [CommonModule],
  template: `
    <h2>Access denied</h2>
    <p>You do not have permission to access this page.</p>
  `
})
export class ForbiddenPage {}

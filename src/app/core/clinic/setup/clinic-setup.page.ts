import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * @deprecated
 * Clinic setup now occurs during user registration.
 * This page is kept for backward compatibility but should no longer be used.
 * New users should use the RegisterComponent instead.
 */
@Component({
  standalone: true,
  selector: 'app-clinic-setup-page',
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding: 20px; text-align: center;">
      <h2>Clinic Setup</h2>
      <p style="color: #f59e0b; border: 1px solid #f59e0b; padding: 10px; margin: 20px 0;">
        <strong>This page is deprecated.</strong> 
        Clinic setup now happens during registration. 
        <a routerLink="/register" style="text-decoration: underline;">Create a new account</a>
      </p>
      <p>If you already have credentials, please <a routerLink="/login" style="text-decoration: underline;">login here</a></p>
    </div>
  `
})
export class ClinicSetupPage {

  constructor(private router: Router) {}
}
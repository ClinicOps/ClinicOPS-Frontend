import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ClinicContextService } from '../../clinic/clinic-context.service';
import { MeService } from '../me.service';
import { RegisterRequest } from '../models';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  email = '';
  password = '';
  clinicName = '';
  clinicCode = '';
  organizationName = '';
  clinicTimezone = 'UTC';
  message = '';
  loading = false;

  private meService = inject(MeService);

  constructor(
    private authService: AuthService,
    private clinicContext: ClinicContextService,
    private router: Router
  ) {}

  register() {
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;
    this.message = '';

    const request: RegisterRequest = {
      email: this.email,
      password: this.password,
      clinicName: this.clinicName,
      clinicCode: this.clinicCode,
      organizationName: this.organizationName || undefined,
      clinicTimezone: this.clinicTimezone || undefined
    };

    this.authService.register(request).subscribe({
      next: (response) => {
        console.log('[RegisterComponent] Received response:', response);
        
        // Store clinic context from response
        this.clinicContext.setClinicId(response.user.clinicId);
        console.log('[RegisterComponent] Clinic context set:', response.user.clinicId);
        
        // Initialize MeService with user data from response
        this.meService.initializeFromAuth(response.user.userId, response.user.clinicId);
        console.log('[RegisterComponent] MeService initialized');
        
        // Navigate to dashboard
        this.router.navigate(['/ops/appointments']);
      },
      error: (error) => {
        console.error('[RegisterComponent] Registration error:', error);
        this.loading = false;
        this.message = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

  private validateForm(): boolean {
    if (!this.email || !this.password || !this.clinicName || !this.clinicCode) {
      this.message = 'Email, password, clinic name, and clinic code are required';
      return false;
    }

    if (this.password.length < 6) {
      this.message = 'Password must be at least 6 characters';
      return false;
    }

    return true;
  }
}
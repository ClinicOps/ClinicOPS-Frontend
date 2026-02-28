import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ClinicContextService } from '../../clinic/clinic-context.service';
import { MeService } from '../me.service';
import { LoginRequest } from '../models';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';
  loading = false;

  private meService = inject(MeService);

  constructor(
    private authService: AuthService,
    private clinicContext: ClinicContextService,
    private router: Router
  ) {}

  login() {
    if (!this.email || !this.password) {
      this.message = 'Email and password are required';
      return;
    }

    this.loading = true;
    this.message = '';

    const request: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(request).subscribe({
      next: (response) => {
        // Store clinic context from response
        this.clinicContext.setClinicId(response.user.clinicId);
        
        // Initialize MeService with user data from response
        this.meService.initializeFromAuth(response.user.userId, response.user.clinicId);
        
        // Navigate to dashboard
        this.router.navigate(['/ops/appointments']);
      },
      error: () => {
        this.loading = false;
        this.message = 'Invalid credentials';
      }
    });
  }
}

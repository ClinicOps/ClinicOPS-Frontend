import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';
  message = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.email, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.message = 'Invalid credentials';
        }
      });
  }
}
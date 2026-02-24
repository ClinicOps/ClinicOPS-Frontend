import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.email, this.password)
      .subscribe({
        next: () => {
          this.message = 'Registered successfully';
        },
        error: () => {
          this.message = 'Registration failed';
        }
      });
  }
}
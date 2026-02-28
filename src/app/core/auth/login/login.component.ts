import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.http
          .get<boolean>('http://localhost:8080/api/clinics/my-membership')
          .subscribe((hasClinic) => {
            if (hasClinic) {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/setup-clinic']);
            }
          });
      },
      error: () => {
        this.message = 'Invalid credentials';
      },
    });
  }
}

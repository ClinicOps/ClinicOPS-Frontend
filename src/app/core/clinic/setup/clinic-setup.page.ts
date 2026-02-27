import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-clinic-setup-page',
  imports: [FormsModule],
  templateUrl: './clinic-setup.page.html'
})
export class ClinicSetupPage {

  organizationName = '';
  clinicName = '';
  timezone = 'Asia/Kolkata';
  message = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  createClinic() {
    this.http.post('http://localhost:8080/clinics/setup', {
      organizationName: this.organizationName,
      clinicName: this.clinicName,
      timezone: this.timezone
    }).subscribe({
      next: () => {
        alert('Clinic created. Please login again.');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.message = 'Failed to create clinic';
      }
    });
  }
}
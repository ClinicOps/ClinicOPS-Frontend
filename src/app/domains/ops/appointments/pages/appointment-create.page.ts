import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MeService } from '../../../../core/auth/me.service';
import { ApiClient } from '../../../../core/api/api-client';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
}

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Component({
  selector: 'app-appointment-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './appointment-create.page.html'
})
export class AppointmentCreatePage implements OnInit {

  patients: Patient[] = [];
  selectedPatientId = '';
  scheduledAt = '';
  loading = false;

  constructor(
    private api: ApiClient,
    private me: MeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    const clinicId = this.me.clinicId();
    if (!clinicId) return;

    this.api
      .get<PageResponse<Patient>>(
        `/api/clinics/${clinicId}/patients?page=0&size=100&status=ACTIVE`
      )
      .subscribe(res => {
        this.patients = res.content;
      });
  }

  create() {
    if (!this.selectedPatientId || !this.scheduledAt) return;

    this.loading = true;

    this.api.post(
      '/ops/appointments',
      {
        patientId: this.selectedPatientId,
        scheduledAt: new Date(this.scheduledAt).toISOString()
      }
    )
    .subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/appointments']);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}

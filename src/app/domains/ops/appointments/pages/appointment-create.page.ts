import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MeService } from '../../../../core/auth/me.service';
import { ApiClient } from '../../../../core/api/api-client';
import { PageResponse, Patient, SlotDTO } from '../types';
import { AppointmentApi } from '../services/appointment.api';

@Component({
  selector: 'app-appointment-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './appointment-create.page.html',
})
export class AppointmentCreatePage implements OnInit {
  patients: Patient[] = [];
  selectedPatientId = '';
  scheduledAt = '';
  loading = false;

  slots: SlotDTO[] = [];
  selectedSlot?: SlotDTO;

  constructor(
    private api: ApiClient,
    private me: MeService,
    private router: Router,
    private appointmentApi: AppointmentApi,
  ) {}

  ngOnInit(): void {
    this.loadPatients();
    this.form.get('doctorId')?.valueChanges.subscribe(() => {
      this.loadSlots();
    });

    this.form.get('appointmentDate')?.valueChanges.subscribe(() => {
      this.loadSlots();
    });
  }

  selectSlot(slot: SlotDTO) {
    if (slot.status !== 'AVAILABLE') return;

    this.selectedSlot = slot;

    this.form.patchValue({
      startTime: slot.start,
    });
  }

  loadPatients() {
    const clinicId = this.me.clinicId();
    if (!clinicId) return;

    this.api
      .get<PageResponse<Patient>>(`/api/clinics/${clinicId}/patients?page=0&size=100&status=ACTIVE`)
      .subscribe((res) => {
        this.patients = res.content;
      });
  }

  loadSlots() {
    const doctorId = this.form.get('doctorId')?.value;
    const date = this.form.get('appointmentDate')?.value;

    if (!doctorId || !date) {
      this.slots = [];
      return;
    }

    this.appointmentApi.getDoctorSlots(doctorId, date).subscribe((res) => {
      this.slots = res;
      this.selectedSlot = undefined;
    });
  }

  create() {
    if (!this.selectedPatientId || !this.scheduledAt) return;

    this.loading = true;

    this.api
      .post('/ops/appointments', {
        patientId: this.selectedPatientId,
        scheduledAt: new Date(this.scheduledAt).toISOString(),
      })
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/appointments']);
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}

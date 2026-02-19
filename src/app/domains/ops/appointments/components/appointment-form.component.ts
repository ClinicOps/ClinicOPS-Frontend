import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-appointment-form',
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="submit()" #f="ngForm">

      <select
        name="patientId"
        [(ngModel)]="patientId"
        required
      >
        <option value="" disabled>Select patient</option>

        <option *ngFor="let p of patients"
                [value]="p.id">
          {{ p.firstName }} {{ p.lastName }}
        </option>
      </select>

      <input
        type="datetime-local"
        name="scheduledAt"
        [(ngModel)]="scheduledAt"
        required
      />

      <button type="submit" [disabled]="f.invalid">
        Create Appointment
      </button>
    </form>
  `
})
export class AppointmentFormComponent {

  @Input() patients: {
    id: string;
    firstName: string;
    lastName: string;
  }[] = [];

  @Output() create = new EventEmitter<{
    patientId: string;
    scheduledAt: string;
  }>();

  patientId = '';
  scheduledAt = '';

  submit() {
    this.create.emit({
      patientId: this.patientId,
      scheduledAt: new Date(this.scheduledAt).toISOString()
    });

    this.patientId = '';
    this.scheduledAt = '';
  }
}


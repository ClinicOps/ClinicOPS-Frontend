import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-appointment-form',
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="submit()" #f="ngForm">
      <input
        type="text"
        name="patientName"
        placeholder="Patient name"
        [(ngModel)]="patientName"
        required
      />

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
  @Output() create = new EventEmitter<{
    patientName: string;
    scheduledAt: string;
  }>();

  patientName = '';
  scheduledAt = '';

  submit() {
    this.create.emit({
      patientName: this.patientName,
      scheduledAt: new Date(this.scheduledAt).toISOString()
    });

    this.patientName = '';
    this.scheduledAt = '';
  }
}

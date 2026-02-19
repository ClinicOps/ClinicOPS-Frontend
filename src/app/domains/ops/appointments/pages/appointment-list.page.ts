import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentFormComponent } from '../components/appointment-form.component';
import { AppointmentFacade } from '../appointment.facade';


@Component({
  standalone: true,
  selector: 'app-appointment-list-page',
  imports: [CommonModule, AppointmentFormComponent],
  templateUrl: 'appointment-list-page.html',
})
export class AppointmentListPage {

  readonly facade = inject(AppointmentFacade);

  // expose signals directly to template
  readonly appointments = this.facade.appointments;
  readonly canView = this.facade.canView;
  readonly canCreate = this.facade.canCreate;
  readonly canUpdate = this.facade.canUpdate;

  onCreate(payload: { patientId: string; scheduledAt: string }) {
    this.facade.create(payload);
  }

  onCancel(id: string) {
    this.facade.cancel(id);
  }
}

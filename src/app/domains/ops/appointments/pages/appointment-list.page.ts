import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentApi, AppointmentDto } from '../services/appointment.api';
import { PermissionService } from '../../../../core/permissions/permission.service';
import { APPOINTMENT_PERMISSIONS } from '../permissions';
import { AppointmentFormComponent } from '../components/appointment-form.component';

@Component({
  standalone: true,
  selector: 'app-appointment-list-page',
  imports: [CommonModule, AppointmentFormComponent],
  template: `
    <section *ngIf="canView; else forbidden">
      <h2>Appointments</h2>

      <!-- CREATE -->
      <app-appointment-form
        *ngIf="canCreate"
        (create)="onCreate($event)">
      </app-appointment-form>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Scheduled At</th>
            <th>Status</th>
            <th *ngIf="canUpdate">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let a of appointments">
            <td>{{ a.patientName }}</td>
            <td>{{ a.scheduledAt | date:'short' }}</td>
            <td>{{ a.status }}</td>
            <td *ngIf="canUpdate">
              <button (click)="onCancel(a.id)">Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <ng-template #forbidden>
      <p>You do not have permission to view appointments.</p>
    </ng-template>
  `
})
export class AppointmentListPage implements OnInit {

  private cdr = inject(ChangeDetectorRef);
  private api = inject(AppointmentApi);
  private permissions = inject(PermissionService);

  appointments: AppointmentDto[] = [];

  canView = false;
  canCreate = false;
  canUpdate = false;

    ngOnInit(): void {
    this.permissions.permissions$
      .subscribe(() => {
        this.canView = this.permissions.has(APPOINTMENT_PERMISSIONS.VIEW);
        this.canCreate = this.permissions.has(APPOINTMENT_PERMISSIONS.CREATE);
        this.canUpdate = this.permissions.has(APPOINTMENT_PERMISSIONS.UPDATE);

        this.cdr.markForCheck();

        if (this.canView) {
          this.load();
        }
      });
  }

  load() {
    this.api.list().subscribe(data => {
      this.appointments = data;
      this.cdr.markForCheck();
    });
  }

  onCreate(payload: { patientName: string; scheduledAt: string }) {
    this.api.create(payload).subscribe(() => {
      this.load();
    });
  }

  onCancel(id: string) {
    this.api.cancel(id).subscribe(() => {
      this.load();
    });
  }
}

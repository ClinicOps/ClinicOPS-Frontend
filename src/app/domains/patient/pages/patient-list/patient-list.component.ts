import { Component } from '@angular/core';
import { HasPermissionDirective, Permission } from '../../../../security';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [HasPermissionDirective],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent {
  Permission = Permission;

}

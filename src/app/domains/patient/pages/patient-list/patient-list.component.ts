import { Component } from '@angular/core';
import { HasPermissionDirective, Permission } from '../../../../security';
import { UiButtonComponent, UiEmptyStateComponent, UiErrorComponent, UiLoadingComponent, UiPageHeaderComponent, UiTableComponent } from '../../../../shared';
import { initialListPageState } from '../../../../shared/ui-contracts/list-page.contract';
import { Patient } from '../../models';
import { defaultPagination } from '../../../../shared/ui-contracts/pagination.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
  HasPermissionDirective,
  UiPageHeaderComponent,
  UiButtonComponent,
  UiLoadingComponent,
  UiEmptyStateComponent,
  UiErrorComponent,
  UiTableComponent
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent {
  Permission = Permission;

  state = initialListPageState<Patient>();
  pagination = defaultPagination;

}

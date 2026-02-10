import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AdminClinicService, AdminClinic } from '../../services/admin-clinic.service';
import { UiEmptyStateComponent, UiErrorComponent, UiLoadingComponent, UiPageHeaderComponent, UiTableComponent } from '../../../../shared';
import { initialListPageState, ListPageState } from '../../../../shared/ui-contracts/list-page.contract';
import { TableColumn } from '../../../../shared/ui-contracts/table-column.model';
import { normalizeError } from '../../../../shared/ui-contracts/error.util';

@Component({
  standalone: true,
  selector: 'admin-clinic-list',
  imports: [
    NgIf,
    UiPageHeaderComponent,
    UiTableComponent,
    UiLoadingComponent,
    UiEmptyStateComponent,
    UiErrorComponent
  ],
  templateUrl: './admin-clinic-list.component.html'
})
export class AdminClinicListComponent implements OnInit {

  state: ListPageState<AdminClinic> =
    initialListPageState<AdminClinic>();

  columns: TableColumn<AdminClinic>[] = [
    { key: 'name', label: 'Clinic' },
    { key: 'workspaceName', label: 'Workspace' },
    { key: 'status', label: 'Status' }
  ];

  constructor(private service: AdminClinicService) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.state.loading = true;

    this.service.getClinics().subscribe({
      next: data => {
        this.state.data = data;
        this.state.loading = false;
      },
      error: err => {
        this.state.error = normalizeError(err);
        this.state.loading = false;
      }
    });
  }
}

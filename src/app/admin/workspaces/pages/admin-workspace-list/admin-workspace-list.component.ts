import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AdminWorkspaceService, AdminWorkspace } from '../../services/admin-workspace.service';
import { UiEmptyStateComponent, UiErrorComponent, UiLoadingComponent, UiPageHeaderComponent, UiTableComponent } from '../../../../shared';
import { initialListPageState, ListPageState } from '../../../../shared/ui-contracts/list-page.contract';
import { TableColumn } from '../../../../shared/ui-contracts/table-column.model';
import { normalizeError } from '../../../../shared/ui-contracts/error.util';



@Component({
  standalone: true,
  selector: 'admin-workspace-list',
  imports: [
    NgIf,
    UiPageHeaderComponent,
    UiTableComponent,
    UiLoadingComponent,
    UiEmptyStateComponent,
    UiErrorComponent
  ],
  templateUrl: './admin-workspace-list.component.html'
})
export class AdminWorkspaceListComponent implements OnInit {

  state: ListPageState<AdminWorkspace> =
    initialListPageState<AdminWorkspace>();

  columns: TableColumn<AdminWorkspace>[] = [
    { key: 'name', label: 'Workspace' },
    { key: 'ownerEmail', label: 'Owner' },
    { key: 'status', label: 'Status' }
  ];

  constructor(private service: AdminWorkspaceService) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.state.loading = true;

    this.service.getWorkspaces().subscribe({
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

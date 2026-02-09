import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { AdminUserService, AdminUser } from '../../services/admin-user.service';

import { UiEmptyStateComponent, UiErrorComponent, UiLoadingComponent, UiPageHeaderComponent, UiTableComponent } from '../../../../shared';
import { TableColumn } from '../../../../shared/ui-contracts/table-column.model';
import { normalizeError } from '../../../../shared/ui-contracts/error.util';
import { initialListPageState, ListPageState } from '../../../../shared/ui-contracts/list-page.contract';


@Component({
  standalone: true,
  selector: 'admin-user-list',
  imports: [
    NgIf,
    UiPageHeaderComponent,
    UiTableComponent,
    UiLoadingComponent,
    UiEmptyStateComponent,
    UiErrorComponent
  ],
  templateUrl: './admin-user-list.component.html'
})
export class AdminUserListComponent implements OnInit {

  state: ListPageState<AdminUser> =
    initialListPageState<AdminUser>();

  columns: TableColumn<AdminUser>[] = [
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' }
  ];

  constructor(private userService: AdminUserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.state.loading = true;

    this.userService.getUsers().subscribe({
      next: users => {
        this.state.data = users;
        this.state.loading = false;
      },
      error: err => {
        this.state.error = normalizeError(err);
        this.state.loading = false;
      }
    });
  }
}

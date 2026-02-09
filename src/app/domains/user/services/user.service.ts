import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/api';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(workspaceId: string): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(
      `${environment.apiBaseUrl}/workspaces/${workspaceId}/users`
    );
  }
}

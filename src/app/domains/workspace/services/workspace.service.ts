import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/api';
import { Workspace } from '../models';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private readonly baseUrl = `${environment.apiBaseUrl}/workspaces`;

  constructor(private http: HttpClient) {}

  getWorkspaces(): Observable<ApiResponse<Workspace[]>> {
    return this.http.get<ApiResponse<Workspace[]>>(this.baseUrl);
  }
}

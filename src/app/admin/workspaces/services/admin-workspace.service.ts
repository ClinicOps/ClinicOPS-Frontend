import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminWorkspace {
  id: string;
  name: string;
  ownerEmail: string;
  status: 'ACTIVE' | 'DISABLED';
}

@Injectable({
  providedIn: 'root'
})
export class AdminWorkspaceService {

  constructor(private http: HttpClient) {}

  getWorkspaces(): Observable<AdminWorkspace[]> {
    return this.http.get<AdminWorkspace[]>('/admin/workspaces');
  }
}

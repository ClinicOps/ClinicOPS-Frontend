import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminUser {
  id: string;
  email: string;
  roles: string[];
  status: 'ACTIVE' | 'DISABLED';
}

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>('/admin/users');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminClinic {
  id: string;
  name: string;
  workspaceName: string;
  status: 'ACTIVE' | 'DISABLED';
}

@Injectable({
  providedIn: 'root'
})
export class AdminClinicService {

  constructor(private http: HttpClient) {}

  getClinics(): Observable<AdminClinic[]> {
    return this.http.get<AdminClinic[]>('/admin/clinics');
  }
}

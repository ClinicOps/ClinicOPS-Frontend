import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/api';
import { Clinic } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private http: HttpClient) {}

  getClinics(workspaceId: string): Observable<ApiResponse<Clinic[]>> {
    return this.http.get<ApiResponse<Clinic[]>>(
      `${environment.apiBaseUrl}/workspaces/${workspaceId}/clinics`
    );
  }
}

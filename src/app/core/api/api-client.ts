import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private readonly baseUrl = 'http://localhost:8080'; // backend base

  constructor(private http: HttpClient) {}

  get<T>(path: string, headers?: HttpHeaders) {
    return this.http.get<T>(`${this.baseUrl}${path}`, { headers });
  }

  post<T>(path: string, body: any, headers?: HttpHeaders) {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, { headers });
  }

  put<T>(path: string, body: any, headers?: HttpHeaders) {
    return this.http.put<T>(`${this.baseUrl}${path}`, body, { headers });
  }

  patch<T>(path: string, body: any, headers?: HttpHeaders) {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body, { headers });
  }

  delete<T>(path: string, headers?: HttpHeaders) {
    return this.http.delete<T>(`${this.baseUrl}${path}`, { headers });
  }
  
}

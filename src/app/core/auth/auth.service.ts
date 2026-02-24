import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { tap } from 'rxjs';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly API = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post(`${this.API}/register`, { email, password });
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this.API}/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('accessToken', res.accessToken);
        })
      );
  }

  getAccessToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
        return null;
    }
    return localStorage.getItem('accessToken');
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  private readonly TOKEN_KEY = 'clinicops_token';
  private platformId = inject(PLATFORM_ID);

  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
        return null;
    }
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clear() {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
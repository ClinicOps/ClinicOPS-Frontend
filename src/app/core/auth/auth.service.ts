import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { tap } from 'rxjs';
import { AuthResponse, RegisterRequest, LoginRequest } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly API = 'http://localhost:8080/auth';
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest) {
    return this.http
      .post<AuthResponse>(`${this.API}/register`, request)
      .pipe(
        tap(res => {
          this.storeTokens(res.accessToken, res.refreshToken);
        })
      );
  }

  login(request: LoginRequest) {
    return this.http
      .post<AuthResponse>(`${this.API}/login`, request)
      .pipe(
        tap(res => {
          this.storeTokens(res.accessToken, res.refreshToken);
        })
      );
  }

  getAccessToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private storeTokens(accessToken: string, refreshToken: string): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('[AuthService] Storing tokens in localStorage');
      localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
      console.log('[AuthService] Tokens stored. accessToken:', accessToken.substring(0, 20) + '...');
    } else {
      console.warn('[AuthService] Not in browser, skipping token storage');
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }
}
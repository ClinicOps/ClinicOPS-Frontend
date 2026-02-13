import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
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
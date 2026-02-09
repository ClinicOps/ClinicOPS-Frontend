import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthUser } from '../../auth/models';
import { AuthService } from '../../auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
  workspaceId?: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private userSubject = new BehaviorSubject<AuthUser | null>(null);
  user$ = this.userSubject.asObservable();

  private isBrowser: boolean;

  constructor(private authService: AuthService,  @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  restoreSession(): Promise<void> {
    if (!this.isBrowser) {
      // SSR / pre-render safe
      console.log('JWT payload restored');
      return Promise.resolve();
    }
    const token = localStorage.getItem('access_token');

    if (!token) {
      return Promise.resolve();
    }

    try {
      const payload = jwtDecode<JwtPayload>(token);

      if (this.isExpired(payload)) {
        this.clearSession();
        return Promise.resolve();
      }

      this.userSubject.next(this.mapToAuthUser(payload));
      return Promise.resolve();

    } catch {
      this.clearSession();
      return Promise.resolve();
    }
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  getCurrentUser(): AuthUser | null {
    return this.userSubject.value;
  }

  logout(): void {
    this.clearSession();
    this.authService.logout();
  }

  // -----------------------
  // Internal helpers
  // -----------------------

  private isExpired(payload: JwtPayload): boolean {
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }

  private mapToAuthUser(payload: JwtPayload): AuthUser {
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles,
      workspaceId: payload.workspaceId
    };
  }

  private clearSession(): void {
    this.userSubject.next(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}

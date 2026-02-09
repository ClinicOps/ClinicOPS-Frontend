import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  restoreSession(): Promise<void> {
    // Phase 1: read token, validate, preload user/workspace
    return Promise.resolve();
  }

  clearSession(): void {
    // Phase 1+
  }
}

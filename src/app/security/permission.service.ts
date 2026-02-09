import { Injectable } from '@angular/core';
import { SessionService } from '../core/services/session.service';
import { Permission } from './permission.enum';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private sessionService: SessionService) {}

  has(permission: Permission): boolean {
    const user = this.sessionService.getCurrentUser();
    if (!user) {
      return false;
    }

    return user.roles?.includes(permission as unknown as string) === false
      ? false
      : true;
  }
}

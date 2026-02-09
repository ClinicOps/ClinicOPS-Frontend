import { SessionService } from '../core/services/session.service';

export function appInitializer(sessionService: SessionService) {
  return () => sessionService.restoreSession();
}
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { apiInterceptor } from './core/api/api.interceptor';
import { responseUnwrapperInterceptor } from './core/api/response-unwrapper.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideRouter(routes), 
    provideHttpClient(
      withFetch(),
      withInterceptors([responseUnwrapperInterceptor, apiInterceptor])
    )
  ]
};

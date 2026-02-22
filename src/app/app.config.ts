import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './shared/interceptors/auth-interceptor';
import {logginResponseInterceptor} from './shared/interceptors/loggin-response-interceptor';
import {errorInterceptor} from './shared/interceptors/error-interceptor';
import {MdbModalModule} from 'mdb-angular-ui-kit/modal';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(MdbModalModule),
    provideHttpClient(withInterceptors(
      [
        authInterceptor,
        logginResponseInterceptor,
        errorInterceptor
      ]), withFetch()
    )
  ]
};

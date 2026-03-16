import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { apiInterceptor } from './interceptors/apiInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([apiInterceptor]), withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ],
};

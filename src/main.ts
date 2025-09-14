import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reducer } from './app/store/reducer';
import { Effects } from './app/store/effects';

const extraProviders = [
  provideRouter(routes),
  provideAnimations(),
  importProvidersFrom(HttpClientModule),
  provideStore({ bookmarks: reducer }),
  provideEffects([Effects]),
];

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    ...extraProviders
  ]
}).catch(err => console.error(err));

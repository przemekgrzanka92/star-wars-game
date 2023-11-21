import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app' },
  {
    path: 'app',
    loadComponent: () =>
      import('./components/app-wrapper/app-wrapper.component').then(
        (c) => c.AppWrapperComponent,
      ),
  },
];

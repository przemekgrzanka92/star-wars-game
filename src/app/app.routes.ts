import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app' },
  {
    path: 'app',
    loadComponent: () =>
      import('./components/game-wrapper/game-wrapper.component').then(
        (c) => c.GameWrapperComponent,
      ),
  },
];

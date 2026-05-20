import { Routes } from '@angular/router';
import { USERS_ROUTES } from '@routes/users.routes';

export const routes: Routes = [
  { path: 'users', loadChildren: () => import('./routes/users.routes').then((m) => USERS_ROUTES) },
  { path: '**', redirectTo: 'users' },
];

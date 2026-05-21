import { UsersListPage } from '@pages/users-list-page/users-list-page';
import { Routes } from '@angular/router';
import { UserFormPage } from '@pages/user-form-page/user-form-page';
import { UserDetailsPage } from '@pages/user-details-page/user-details-page';

export const USERS_ROUTES: Routes = [
  { path: '', component: UsersListPage },
  { path: 'form/:id', component: UserFormPage },
  { path: 'new', component: UserFormPage },
  { path: ':id', component: UserDetailsPage },
];

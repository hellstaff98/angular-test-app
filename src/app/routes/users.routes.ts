import { UsersListPage } from '@pages/users-list-page/users-list-page';
import { Routes } from '@angular/router';
import { UserCreatePage } from '@pages/user-create-page/user-create-page';
import { UserDetailsPage } from '@pages/user-details-page/user-details-page';

export const USERS_ROUTES: Routes = [
  { path: '', component: UsersListPage },
  { path: 'add', component: UserCreatePage },
  { path: ':id', component: UserDetailsPage },
];

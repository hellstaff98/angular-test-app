import { Component, inject, OnInit, signal } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { UserService } from '@core/services/user-service';
import { User } from '@models/user.interface';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { Router, RouterLink } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { finalize, tap } from 'rxjs';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-users-list-page',
  imports: [
    NzCardModule,
    NzSpinModule,
    NzResultModule,
    NzTypographyComponent,
    NzButtonComponent,
    NzIconDirective,
    RouterLink,
    NzSkeletonComponent,
  ],
  templateUrl: './users-list-page.html',
  styleUrl: './users-list-page.scss',
})
export class UsersListPage {
  private userService = inject(UserService);
  private router = inject(Router);

  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadUsers();
  }

  onUserClick(id: number) {
    this.router.navigate(['/users', id]);
  }

  private loadUsers() {
    this.loading.set(true);
    this.error.set(null);

    this.userService
      .getUsers()
      .pipe(
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe({
        next: (users) => {
          this.users.set(users);
        },
        error: (err) => {
          this.error.set('Не удалось загрузить список пользователей :(');
          console.error(err);
        },
      });
  }
}

import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { UserService } from '@core/services/user-service';
import { User } from '@models/user.interface';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { Router, RouterLink } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';
import { finalize } from 'rxjs';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import {
  NzInputDirective,
  NzInputSearchDirective,
  NzInputWrapperComponent,
} from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-users-list-page',
  imports: [
    NzCardModule,
    NzResultModule,
    NzTypographyComponent,
    NzButtonComponent,
    NzIconDirective,
    RouterLink,
    NzSkeletonComponent,
    NzIconModule,
    NzInputSearchDirective,
    NzInputDirective,
    FormsModule,
    NzInputWrapperComponent,
    NzPaginationComponent,
    NzSelectComponent,
    NzOptionComponent,
  ],
  templateUrl: './users-list-page.html',
  styleUrl: './users-list-page.scss',
})
export class UsersListPage implements OnInit {
  readonly searchQuery = signal('');

  currentPage = signal(1);
  pageSize = signal(6);
  filterField = signal<'name' | 'email'>('email');
  private router = inject(Router);

  private userService = inject(UserService);

  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadUsers();
  }

  onUserClick(id: number) {
    this.router.navigate(['/users', id]);
  }

  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.users();
    return this.users().filter((u) => u[this.filterField()].toLowerCase().includes(query));
  });

  onFilterFieldChange(field: 'name' | 'email') {
    this.filterField.set(field);
    this.currentPage.set(1);
  }

  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredUsers().slice(start, start + this.pageSize());
  });

  onPageChange(page: number) {
    this.currentPage.set(page);
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

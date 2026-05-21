import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '@core/services/user-service';
import { User } from '@models/user.interface';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-details-page',
  imports: [
    NzCardModule,
    NzButtonComponent,
    NzIconDirective,
    NzSkeletonModule,
    NzResultModule,
    NzTagModule,
    NzDividerModule,
    RouterLink,
  ],
  templateUrl: './user-details-page.html',
  styleUrl: './user-details-page.scss',
})
export class UserDetailsPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  user = signal<User | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/users']);
      return;
    }

    this.userService
      .getUserDetails(+id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (user) => this.user.set(user),
        error: () => this.error.set('Не удалось загрузить пользователя'),
      });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}

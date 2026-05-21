import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '@core/services/user-service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { finalize } from 'rxjs';
import { NzCardComponent } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-user-form-page',
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonComponent,
    NzIconDirective,
    NzSkeletonModule,
    NzResultModule,
    NzCardComponent,
  ],
  templateUrl: './user-form-page.html',
  styleUrl: './user-form-page.scss',
})
export class UserFormPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  isEditMode = signal(false);
  loading = signal(false);
  submitting = signal(false);
  error = signal<string | null>(null);

  private userId: number | null = null;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[+?0-9 ()-.x]*')]),
    website: new FormControl(''),
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode.set(true);
      this.userId = +id;
      this.loadUser(this.userId);
    }
  }

  private loadUser(id: number) {
    this.loading.set(true);

    this.userService
      .getUserDetails(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (user) => this.form.patchValue(user),
        error: () => this.error.set('Не удалось загрузить пользователя'),
      });
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    this.submitting.set(true);

    const action = this.isEditMode()
      ? this.userService.updateUser(this.userId!, this.form.value)
      : this.userService.createUser(this.form.value);

    action.pipe(finalize(() => this.submitting.set(false))).subscribe({
      next: () => this.router.navigate(['/users']),
      error: () => this.error.set('Не удалось сохранить пользователя'),
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}

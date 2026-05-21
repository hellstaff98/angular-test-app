import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@models/user.interface';
import { catchError, delay, throwError, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  baseApiUrl = 'https://jsonplaceholder.typicode.com';

  getUsers() {
    return this.http.get<User[]>(`${this.baseApiUrl}/users`).pipe(
      timeout(5000),
      catchError(() => throwError(() => new Error('Не удалось загрузить пользователей'))),
    );
  }

  getUserDetails(id: number) {
    return this.http.get<User>(`${this.baseApiUrl}/users/${id}`).pipe(
      timeout(5000),
      catchError(() => throwError(() => new Error('Пользователь не найден'))),
    );
  }

  createUser(user: Partial<User>) {
    return this.http.post<Partial<User>>(`${this.baseApiUrl}/users`, user).pipe(
      timeout(5000),
      catchError(() => throwError(() => new Error('Не удалось создать пользователя'))),
    );
  }

  updateUser(id: number, user: Partial<User>) {
    return this.http.put<Partial<User>>(`${this.baseApiUrl}/users/${id}`, user).pipe(
      timeout(5000),
      catchError(() => throwError(() => new Error('Не удалось обновить пользователя'))),
    );
  }
}

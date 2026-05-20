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
      catchError(() => throwError(() => new Error('Превышено время ожидания'))),
    );
  }
}

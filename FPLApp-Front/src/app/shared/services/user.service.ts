import { Injectable, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Credentials, LoggedInUser, Person, UserPerson } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';
  
  user = signal<LoggedInUser | null>(null);

  constructor(private http: HttpClient) {
    effect(() => {
      if (this.user()) {
        console.log('User logged in: ', this.user().first_name);
      } else {
        console.log('No user logged in');
      }
    })
   }

  checkUsername(username: string): Observable<boolean> {
    return this.http.get<{ available: boolean }>(`${this.apiUrl}/check-username/?username=${username}`).pipe(
      map(response => response.available)
    );
  }

  register(user: UserPerson): Observable<any> {
    console.log(user);
    return this.http.post(`${this.apiUrl}/register/`, user);
  }

  login(credentials: Credentials): Observable<any> {
    return this.http.post<{access_token: string}>(`${this.apiUrl}/login/`, credentials);
  }
}

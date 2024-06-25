import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person, UserPerson } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  checkUsername(username: string): Observable<boolean> {
    return this.http.get<{ available: boolean }>(`${this.apiUrl}/check-username/?username=${username}`).pipe(
      map(response => response.available)
    );
  }

  register(user: UserPerson): Observable<any> {
    console.log(user);
    return this.http.post(`${this.apiUrl}/register/`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, credentials);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUrl = 'http://localhost:8000/api/register/';
  private checkUsernameUrl = 'http://localhost:8000/api/check-username/';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  checkUsername(username: string): Observable<boolean> {
    return this.http.post<{ isTaken: boolean }>(this.checkUsernameUrl, { username }).pipe(
      map(response => response.isTaken),
      catchError(() => of(false)) // In case of error, assume username is not taken
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000/api/';
  private registerUrl = 'http://localhost:8000/api/register/';
  private checkUsernameUrl = 'http://localhost:8000/api/check-username/';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    const headers = new HttpHeaders().set('X-CSRFToken', localStorage.getItem('csrftoken') || '');
    return this.http.post<any>(this.registerUrl, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  checkUsername(username: string): Observable<boolean> {
    return this.http.post<{ isTaken: boolean }>(this.checkUsernameUrl, { username }).pipe(
      map(response => response.isTaken),
      catchError(() => of(false))
    );
  }

  private getCookie(name: string) {
    let cookieValue = '';
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }

    return cookieValue;
  }
}

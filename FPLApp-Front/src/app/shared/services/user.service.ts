import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000/api/';
  private registerUrl = `${this.apiUrl}register/`;
  private loginUrl = `${this.apiUrl}login/`;
  private checkUsernameUrl = `${this.apiUrl}check-username/`;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    const headers = new HttpHeaders().set('X-CSRFToken', this.getCookie('csrftoken'));
    return this.http.post<any>(this.registerUrl, user, { headers });
  }

  login(user: any): Observable<any> {
    const headers = new HttpHeaders().set('X-CSRFToken', this.getCookie('csrftoken'));
    return this.http.post<any>(this.loginUrl, user, { headers });
  }

  checkUsername(username: string): Observable<boolean> {
    return this.http.get<{ available: boolean }>(`${this.checkUsernameUrl}?username=${username}`).pipe(
      map(response => !response.available),
      catchError(() => of(false))
    );
  }

  private getCookie(name: string): string {
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

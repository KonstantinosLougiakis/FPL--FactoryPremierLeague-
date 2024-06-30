import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Credentials, LoggedInUser, UserPerson } from '../interfaces/person';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';
  router = inject(Router);
  
  user = signal<LoggedInUser | null>(this.getUserFromToken());

  constructor(private http: HttpClient) {
    effect(() => {
      if (this.user()) {
        console.log('User logged in');
      } else {
        console.log('No user logged in');
      }
    });
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
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login/`, credentials).pipe(
      map(response => {
        const accessToken = response.access_token;
        localStorage.setItem('access_token', accessToken);
        const user = this.decodeToken(accessToken);
        this.user.set(user);
        return response;
      })
    );
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('JWT_TOKEN');
    this.router.navigate(['/login']);
  }

  private decodeToken(token: string): LoggedInUser {
    try {
      const decoded: any = jwtDecode(token);
      console.log('Decoded token:', decoded);
      return {
        first_name: decoded.user?.first_name,
        last_name: decoded.user?.last_name,
        email: decoded.user?.email
      };
    } catch (error) {
      console.error('Invalid token specified', error);
      return null;
    }
  }
  
  private getUserFromToken(): LoggedInUser | null {
    const token = localStorage.getItem('access_token');
    return token ? this.decodeToken(token) : null;
  }
}

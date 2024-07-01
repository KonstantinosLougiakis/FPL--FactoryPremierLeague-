import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { LoggedInUser, Credentials, UserPerson } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';
  router = inject(Router);
  user = signal<LoggedInUser | null>(this.getUserFromToken());

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('JWT_TOKEN');
    if (token) {
      const user = this.decodeToken(token);
      this.user.set(user);
    }
    effect(() => {
      if (this.user()) {
        console.log('User logged in');
      }
      // } else {
      //     console.log('No user logged in');
      // }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('JWT_TOKEN');
  }

  checkUsername(username: string): Observable<boolean> {
    return this.http.get<{ available: boolean }>(`${this.apiUrl}/check-username/?username=${username}`).pipe(
      map(response => response.available)
    );
  }

  register(user: UserPerson): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, user);
  }

  login(credentials: Credentials): Observable<any> {
    return this.http.post<{ JWT_TOKEN: string }>(`${this.apiUrl}/login/`, credentials).pipe(
      map(response => {
        const jwtToken = response.JWT_TOKEN;
        sessionStorage.setItem('JWT_TOKEN', jwtToken); 
        const user = this.decodeToken(jwtToken);
        this.user.set(user);
        return response;
      })
    );
  }

  logout() {
    this.user.set(null);
    sessionStorage.removeItem('JWT_TOKEN'); 
    this.router.navigate(['/login']);
  }

  private decodeToken(token: string): LoggedInUser | null {
    try {
      if (!token) {
        console.error('Token is undefined or null');
        return null;
      }
      
      const decoded: any = jwtDecode(token);
      if (!decoded || !decoded.user) {
        console.error('Invalid token structure');
        return null;
      }

      return {
        first_name: decoded.user.first_name,
        last_name: decoded.user.last_name,
        email: decoded.user.email
      };
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
  
  private getUserFromToken(): LoggedInUser | null {
    const token = sessionStorage.getItem('JWT_TOKEN');
    return token ? this.decodeToken(token) : null;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() { }

  login(user: { email: string; password: string; }): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/login/', user).pipe(
      tap((tokens: any) => this.doLoginUser(user.email, JSON.stringify(tokens))),
    );
  }

  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getCurrentAuthUser() {
    return this.http.get('http://127.0.0.1:8000/admin/teams/user/add/');
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  isTokenExpired() {
    const tokens = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return true;
    const token = JSON.parse(tokens).access_token;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (!decoded.exp) return true;

      const expirationDate = decoded.exp * 1000;
      const now = new Date().getTime();

      return expirationDate < now;
    } catch (error) {
      console.error('Error decoding token', error);
      return true;
    }
    }

    refreshToken() {
      let tokens: any = localStorage.getItem(this.JWT_TOKEN);
      // if (!tokens) return;
      tokens = JSON.parse(tokens).refresh_token;
      let refreshToken = tokens.refresh_token;
      return this.http.post<any>('http://127.0.0.1:8000/admin/teams/user/add/', {
        refreshToken,
      }).pipe(
        tap((tokens: any) => this.storeJwtToken(tokens.access_token))
      );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
}

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

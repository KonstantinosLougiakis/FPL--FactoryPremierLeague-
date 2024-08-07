import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player, Team } from '../shared/interfaces/teams';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/api/teams/`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  getPlayers(teamId: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/api/teams/`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  getFavouriteTeams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/favourite-teams/`);
  }

  addFavouriteTeam(teamId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/favourite-teams/`, { team_name: teamId });
  }

  removeFavouriteTeam(teamId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/favourite-teams/${teamId}/`);
  }
}

export { Player };

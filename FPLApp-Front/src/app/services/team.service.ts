import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Team } from '../shared/interfaces/teams';

const TEAMS_URL = 'http://localhost:8000/api/teams/';
const PLAYERS_URL = 'http://localhost:8000/api/player/';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  http: HttpClient = inject(HttpClient);

  getTeams() {
    return this.http.get<Team[]>(TEAMS_URL, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  getPlayers() {
    return this.http.get(PLAYERS_URL, {
      headers: {
        Accept: 'application/json',
      },
    });
  }
}

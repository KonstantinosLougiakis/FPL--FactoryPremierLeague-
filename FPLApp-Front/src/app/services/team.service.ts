import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Team } from '../shared/interfaces/teams';
import { BehaviorSubject, Observable } from 'rxjs';

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

export interface Player {
  id: number;
  firstname: string;
  lastname: string;
  position: string;
  pref_foot: string;
  nationality: string;
  age: number;
  team: string;
}

export class MyTeamService {
  private playersSubject = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSubject.asObservable();

  private players: Player[] = [];

  addPlayer(player: Player) {
    this.players.push(player);
    this.playersSubject.next(this.players);

  }

  removePlayer(playerId: number) {
    this.players = this.players.filter((player) => player.id !== playerId);
    this.playersSubject.next(this.players);
  }
}
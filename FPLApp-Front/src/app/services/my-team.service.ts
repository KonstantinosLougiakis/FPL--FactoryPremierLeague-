import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class MyTeamService {
  private apiUrl = 'http://localhost:8000';

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

  saveMyTeam(myTeam: any) {
    this.players = myTeam.players;
    this.playersSubject.next(this.players);
  }
}

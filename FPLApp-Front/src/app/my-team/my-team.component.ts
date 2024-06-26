import { Component, NgModule, OnInit } from '@angular/core';
import { TeamService, Player, MyTeamService } from '../services/team.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-team',
  standalone: true,
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css'],
  imports : [FormsModule, CommonModule]
})
export class MyTeamComponent implements OnInit {
  players: Player[] = [];
  newPlayer: Player = {
    id: 0,
    firstname: '',
    lastname: '',
    position: '',
    team: '',
    pref_foot: '',
    nationality: '',
    age: 0
  };

  constructor(private teamService: MyTeamService) {}

  ngOnInit(): void {
    this.teamService.players$.subscribe(players => this.players = players);
  }

  addPlayer() {
    if (this.newPlayer.lastname && this.newPlayer.position && this.newPlayer.team) {
      this.newPlayer.id = this.players.length + 1;
      this.teamService.addPlayer(this.newPlayer);
      this.newPlayer = {
         id: 0,
         firstname: '',
         lastname: '',
         pref_foot: '',
         nationality: '',
         age: 0,
         position: '',
         team: ''
      };
    }
  }

  removePlayer(playerId: number) {
    this.teamService.removePlayer(playerId);
  }
}

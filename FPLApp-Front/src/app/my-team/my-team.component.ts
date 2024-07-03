import { Component, OnInit, inject } from '@angular/core';
import { TeamService, Player } from '../services/team.service';
import { MyTeamService } from '../services/my-team.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Team } from '../shared/interfaces/teams';

@Component({
  selector: 'app-my-team',
  standalone: true,
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css'],
  imports: [FormsModule, CommonModule]
})
export class MyTeamComponent implements OnInit {

  // private apiUrl = 'http://localhost:8000/api/teams/<int:team_pk>/player/';
  // teamService = inject(TeamService);

  teams: Team[] = [];
  toggledTeams: { [key: string]: boolean } = {};
  teamColors: { [key: string]: string } = {
    'Arsenal': '#EF0107',
    'Aston Villa': '#95BFE5',
    'Bournemouth': '#DA291C',
    'Brentford': '#E30613',
    'Brighton & Hove Albion': '#0057B8',
    'Burnley': '#6C1D45',
    'Chelsea': '#034694',
    'Crystal Palace': '#1B458F',
    'Everton': '#003399',
    'Fulham': '#CC0000',
    'Liverpool': '#C8102E',
    'Luton Town': '#FB4F14',
    'Manchester City': '#6CABDD',
    'Manchester United': '#DA291C',
    'Newcastle United': '#241F20',
    'Sheffield United': '#EE2737',
    'Tottenham Hotspur': '#132257',
    'West Ham United': '#7A263A',
    'Wolverhampton Wanderers': '#FDB913',
    'Nottingham Forest': '#E53233'
  }

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
  myTeam: any = { budget: 100, players: [] };
  playersByTeam: { [key: string]: Player[] } = {};

  constructor(private myTeamService: MyTeamService, private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((data: Team[]) => {
      console.log(data);
      this.teams = data.sort((a, b) => a.name.localeCompare(b.name));
      // Move Nottingham Forest to the end
      const nottinghamForestIndex = this.teams.findIndex(team => team.name === 'Nottingham Forest');
      if (nottinghamForestIndex > -1) {
        const nottinghamForest = this.teams.splice(nottinghamForestIndex, 1)[0];
        this.teams.push(nottinghamForest);
      }

      this.teams.forEach(team => {
        this.toggledTeams[team.name] = false; 
      });
    });
  }

  togglePlayers(teamName: string): void {
    this.toggledTeams[teamName] = !this.toggledTeams[teamName];
  }

  addPlayer(player: Player) {
    if (player.lastname && player.position && player.team) {
      this.myTeamService.addPlayer(player);
    }
  }

  removePlayer(playerId: number) {
    this.myTeamService.removePlayer(playerId);
  }

  saveMyTeam() {
    this.myTeamService.saveMyTeam(this.myTeam);
  }

  groupPlayersByTeam() {
    this.playersByTeam = this.players.reduce((acc, player) => {
      if (!acc[player.team]) {
        acc[player.team] = [];
      }
      acc[player.team].push(player);
      return acc;
    }, {} as { [key: string]: Player[] });
  }
}

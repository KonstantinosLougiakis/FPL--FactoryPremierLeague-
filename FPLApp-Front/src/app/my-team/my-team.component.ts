import { Component, OnInit, inject } from '@angular/core';
import { TeamService, Player } from '../services/team.service';
import { MyTeamService } from '../services/my-team.service';
import { Team } from '../shared/interfaces/teams';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-team',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  teamService = inject(TeamService);
  myTeamService = inject(MyTeamService);
  teams: Team[] = [];
  playersByTeam: { [key: string]: Player[] } = {};
  myTeamPlayers: Player[] = [];
  toggledTeams: { [key: string]: boolean } = {};
  showSaveMessage = false;

  // constructor(private teamService: TeamService, private myTeamService: MyTeamService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((data: Team[]) => {
      console.log(data);
      this.teams = data;

      this.teams.forEach(team => {
        this.toggledTeams[team.name] = false; 
      });
    });

    this.myTeamService.players$.subscribe((players: Player[]) => {
      this.myTeamPlayers = players || [];
      this.groupPlayersByTeam();
    });
  }

  togglePlayers(team: Team): void {
    this.toggledTeams[team.name] = !this.toggledTeams[team.name];
    // if (!this.playersByTeam[team.name]) {
    //   this.teamService.getPlayers(team.id).subscribe((players: Player[]) => {
    //     this.playersByTeam[team.name] = players;
    //   });
    // } else {
    //   delete this.playersByTeam[team.name];
    // }
  }

  saveMyTeam(): void {
    console.log(this.myTeamPlayers);
    this.myTeamService.saveMyTeam(this.myTeamPlayers);
    this.showSaveMessage = true;
    setTimeout(() => {
      this.showSaveMessage = false;
    }, 3000);
  }

  addPlayerToMyTeam(player: Player): void {
    this.myTeamService.addPlayer(player);
  }

  removePlayerFromMyTeam(playerId: number): void {
    this.myTeamService.removePlayer(playerId);
  }

  groupPlayersByTeam(): void {
    this.playersByTeam = (this.myTeamPlayers || []).reduce((acc, player) => {
      if (!acc[player.team]) {
        acc[player.team] = [];
      }
      acc[player.team].push(player);
      return acc;
    }, {} as { [key: string]: Player[] });
  }
}

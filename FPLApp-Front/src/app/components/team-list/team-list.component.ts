import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from 'src/app/services/team.service';
import { Team, Player } from 'src/app/shared/interfaces/teams';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  
  teamService = inject(TeamService);
  teams: Team[] = [];
  selectedTeam: Team | null = null;

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((data: Team[]) => {
      this.teams = data;
      console.log(this.teams);
    });
  }

  
  onTeamButtonClick(team: Team): void {
    if (this.selectedTeam === team) {
      this.selectedTeam = null; // Hide players if the same team is clicked again
    } else {
      this.selectedTeam = team; // Show players of the clicked team
    }
  }
}

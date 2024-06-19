import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/shared/interfaces/teams';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  
  teamService = inject(TeamService);
  teams: Team[] = [];

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((data: Team[]) => {
      this.teams = data;
      console.log(this.teams);
    });
  }
}

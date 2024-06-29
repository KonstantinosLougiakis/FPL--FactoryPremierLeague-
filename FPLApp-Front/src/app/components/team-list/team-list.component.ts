import { Component, OnInit, inject } from '@angular/core';
import { Player, TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/shared/interfaces/teams';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
// import { UserProfileService } from 'src/app/services/my-team.service';
// import { UserProfile } from 'src/app/shared/interfaces/person';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  teamService = inject(TeamService);
  // userProfileService = inject(UserProfileService);
  // userProfile: UserProfile | undefined;
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
  };

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

    // this.userProfileService.getUserProfile().subscribe((profile: UserProfile) => {
    //   this.userProfile = profile;
    // });
  }

  togglePlayers(teamName: string): void {
    this.toggledTeams[teamName] = !this.toggledTeams[teamName];
  }

  getTeamColor(teamName: string): string {
    return this.teamColors[teamName] || '#ffffff'; 
  }

  // selectFavoriteTeam(team: Team): void {
  //   if (this.userProfile) {
  //     this.userProfile.favorite_team = team;
  //     this.userProfileService.updateUserProfile(this.userProfile).subscribe((data: UserProfile) => {
  //       this.userProfile = data;
  //     });
  //   }
  // }
}

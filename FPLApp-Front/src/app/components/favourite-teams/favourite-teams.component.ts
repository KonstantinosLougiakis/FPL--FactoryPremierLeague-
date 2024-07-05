import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-favourite-teams',
  standalone: true,
  imports: [NgFor, CommonModule, MatCardModule],
  templateUrl: './favourite-teams.component.html',
  styleUrls: ['./favourite-teams.component.css']
})
export class FavouriteTeamsComponent implements OnInit {
  teams: any[] = [];
  favouriteTeams: any[] = [];
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

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.loadTeams();
    this.loadFavourites();
  }

  loadTeams() {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  loadFavourites() {
    const favourites = localStorage.getItem('favouriteTeams');
    if (favourites) {
      this.favouriteTeams = JSON.parse(favourites);
    }
  }

  toggleFavourite(team: any) {
    if (this.isFavourite(team)) {
      this.favouriteTeams = this.favouriteTeams.filter(fav => fav.id !== team.id);
    } else {
      this.favouriteTeams.push(team);
    }
    sessionStorage.setItem('favouriteTeams', JSON.stringify(this.favouriteTeams));
  }

  // toggleFavourite(team: any) {
  //   const favourite = this.favouriteTeams.find(fav => fav.team_name === team.name);
  //   if (favourite) {
  //     this.teamService.removeFavouriteTeam(favourite.id).subscribe(() => {
  //       this.favouriteTeams = this.favouriteTeams.filter(fav => fav.id !== favourite.id);
  //     });
  //   } else {
  //     this.teamService.addFavouriteTeam(team).subscribe(newFavourite => {
  //       this.favouriteTeams.push(newFavourite);
  //     });
  //   }
  // }

  isFavourite(team: any): boolean {
    return this.favouriteTeams.some(fav => fav.id === team.id);
  }

  getTeamColor(teamName: string): string {
    return this.teamColors[teamName] || '#ffffff'; 
  }
}

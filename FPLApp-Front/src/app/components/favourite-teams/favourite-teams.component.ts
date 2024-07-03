import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-favourite-teams',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './favourite-teams.component.html',
  styleUrls: ['./favourite-teams.component.css']
})
export class FavouriteTeamsComponent implements OnInit {
  teams: any[] = [];
  favouriteTeams: any[] = [];

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
    localStorage.setItem('favouriteTeams', JSON.stringify(this.favouriteTeams));
  }

  isFavourite(team: any): boolean {
    return this.favouriteTeams.some(fav => fav.id === team.id);
  }
}

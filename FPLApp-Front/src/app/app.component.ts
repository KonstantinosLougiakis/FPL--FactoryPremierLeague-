import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyMenuComponent } from './components/my-menu/my-menu.component';
import { TeamListComponent } from "./components/team-list/team-list.component";
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { CommonModule } from '@angular/common';
import { TeamService } from './services/team.service';
import { MyTeamComponent } from "./components/my-team/my-team.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { MyTeamService } from './services/my-team.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MyTeamService],
    imports: [RouterLink, RouterOutlet, MyMenuComponent, TeamListComponent, UserRegistrationComponent, UserLoginComponent, CommonModule, MyTeamComponent, NavbarComponent, FormsModule]
})
export class AppComponent {}

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyMenuComponent } from './components/my-menu/my-menu.component';
import { TeamListComponent } from "./components/team-list/team-list.component";
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { CommonModule } from '@angular/common';
import { MyTeamService } from './services/team.service';
import { MyTeamComponent } from "./my-team/my-team.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MyTeamService],
    imports: [RouterLink, RouterOutlet, MyMenuComponent, TeamListComponent, UserRegistrationComponent, UserLoginComponent, CommonModule, MyTeamComponent]
})
export class AppComponent {}

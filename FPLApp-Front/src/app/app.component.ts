import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyMenuComponent } from './components/my-menu/my-menu.component';
import { TeamListComponent } from "./components/team-list/team-list.component";
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterLink, RouterOutlet, MyMenuComponent, TeamListComponent, UserRegistrationComponent, UserLoginComponent]
})
export class AppComponent {
  
}
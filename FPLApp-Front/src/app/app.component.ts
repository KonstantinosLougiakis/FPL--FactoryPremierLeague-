import { Component } from '@angular/core';
import { PersonTableComponent } from './components/person-table/person-table.component';
import { Person } from './shared/interfaces/person';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyMenuComponent } from './components/my-menu/my-menu.component';
import { TeamListComponent } from "./components/team-list/team-list.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterLink, RouterOutlet, MyMenuComponent, TeamListComponent,]
})
export class AppComponent {
  
}
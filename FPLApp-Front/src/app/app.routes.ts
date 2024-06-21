import { Routes } from '@angular/router';
import { TeamListComponent } from './components/team-list/team-list.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ComponentInputComponent } from './components/component-input/component-input.component';
import { ForDirectiveComponent } from './components/for-directive/for-directive.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';

export const routes: Routes = [
    { path: 'component-input', component: ComponentInputComponent },
    { path: 'for-directive', component: ForDirectiveComponent },
    { path: 'teams', component: TeamListComponent },
    { path: 'players', component: PlayerListComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: '', component: WelcomeComponent },
    { path: 'register', component: UserRegistrationComponent },
];
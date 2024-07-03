import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TeamListComponent } from './components/team-list/team-list.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ComponentInputComponent } from './components/component-input/component-input.component';
import { ForDirectiveComponent } from './components/for-directive/for-directive.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { authGuard } from './guards/auth.guard';
import { MyTeamComponent } from './my-team/my-team.component';
import { FavouriteTeamsComponent } from './components/favourite-teams/favourite-teams.component';

export const routes: Routes = [
    { path: 'component-input', component: ComponentInputComponent },
    { path: 'for-directive', component: ForDirectiveComponent },
    { path: 'teams', component: TeamListComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'register', component: UserRegistrationComponent },
    { path: 'my-team', component: MyTeamComponent, canActivate: [authGuard] },
    { path: 'favourite-teams', component: FavouriteTeamsComponent, canActivate: [authGuard] },
    { path: 'welcome', component: WelcomeComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: '**', component: WelcomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
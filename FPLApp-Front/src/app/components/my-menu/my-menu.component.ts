import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-my-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './my-menu.component.html',
  styleUrl: './my-menu.component.css'
})
export class MyMenuComponent {
  menu: MenuItem[] = [
    { text: 'Admins', routerLink: 'component-input' },
    { text: 'Users', routerLink: 'for-directive' },
    { text: 'Teams', routerLink: 'teams' },
    { text: 'Players', routerLink: 'players' },
    { text: 'Register', routerLink: 'register' },
  ];
}

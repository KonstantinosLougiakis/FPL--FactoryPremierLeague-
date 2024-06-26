import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: './my-menu.component.html',
  styleUrl: './my-menu.component.css'
})
export class MyMenuComponent {
  menu: MenuItem[] = [
    { text: 'Admins', routerLink: 'component-input' },
    { text: 'Users', routerLink: 'for-directive' },
    { text: 'Teams', routerLink: 'teams' },
    { text: 'Login', routerLink: 'login' },
    { text: 'Register', routerLink: 'register' },
    { text: 'My Team', routerLink: 'my-team' },
  ];
}

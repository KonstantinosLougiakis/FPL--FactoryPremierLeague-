import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { MyMenuComponent } from "../my-menu/my-menu.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [MatIconModule, RouterLink, MyMenuComponent, CommonModule]
})
export class NavbarComponent {
  userService = inject(UserService);
  user = this.userService.user;

  logout() {
    this.userService.logout();
    this.user.set(null);
    localStorage.removeItem('JWT_TOKEN');
    localStorage.clear();
    this.userService.router.navigate(['/login']);
  }
}

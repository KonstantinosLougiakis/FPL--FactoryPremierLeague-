import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { MyMenuComponent } from "../my-menu/my-menu.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [MatIconModule, RouterLink, MyMenuComponent]
})
export class NavbarComponent {
  userService = inject(UserService);
  user = this.userService.user;

  logout() {
    this.userService.logout();
  }
}

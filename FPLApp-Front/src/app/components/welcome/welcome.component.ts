import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  
  authService = inject(AuthService);
  user?: any;

  constructor() {
    this.authService.login({
        email: 'john@mail.com',
        password: 'changeme',
    }).subscribe((r)=>{
        this.authService.getCurrentAuthUser().subscribe((r)=>console.log(r));
        this.user = r;
    });
  }

  logout() {
    this.authService.logout();
    localStorage.clear();
  }

  refreshToken() {
    this.authService.refreshToken()?.subscribe(()=> {});
  }
}

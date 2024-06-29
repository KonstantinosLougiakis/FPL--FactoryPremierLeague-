import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../shared/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  // const userService = inject(UserService);
  let authService = inject(AuthService);
  let routerService = inject(Router);
  if (!authService.isLoggedIn()) {
    routerService.navigate(['/login']);
    return false;
  }
  return true;
};

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const routerService = inject(Router);
  
//   if (authService.isLoggedIn()) {
//     return true;
//   }

//   routerService.navigate(['/login']);
// }
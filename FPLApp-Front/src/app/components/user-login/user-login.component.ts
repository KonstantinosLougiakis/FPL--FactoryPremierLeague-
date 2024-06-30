import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Credentials, LoggedInUser } from 'src/app/shared/interfaces/person';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, UserRegistrationComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  loginForm: FormGroup;

  email = '';
  password = '';
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);

  invalidLogin = false;

  onSubmit() {
    const credentials = this.loginForm.value as Credentials;
    this.userService.login(credentials).subscribe((r) => {
      const { access_token } = r.access_token;
      localStorage.setItem('access_token', access_token);
      // const decodedTokenSubject = jwtDecode(access_token).sub as unknown as LoggedInUser;
      // this.authService.setLoggedInUser(decodedTokenSubject);

      this.router.navigate(['/my-team']);
    })
  }

  login() {
    this.invalidLogin = false;
    const credentials: Credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe(
      (response) => {
        alert('Login successful');
        this.userService.user.set({
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email
        });
        this.router.navigate(['/welcome']);
      },
      (error) => {
        if (error.status === 400 || error.status === 500) {
          this.invalidLogin = true;
        } else {
          console.error('Login error', error);
        }
      }
    )
  }
}

  // constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {}

  // ngOnInit(): void {
  //   this.loginForm = this.fb.group({
  //     username: ['', Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+$')],
  //     password: ['', Validators.required, Validators.minLength(4)]
  //   });
  // }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     this.authService.login(this.loginForm.value).subscribe(
  //       response => {
  //         console.log('Login successful', response);
  //         this.router.navigate(['/welcome']);
  //       },
  //       error => {
  //         console.error('Login error', error);
  //       }
  //     );
  //   }
  // }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, UserRegistrationComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+$')],
      password: ['', Validators.required, Validators.minLength(4)]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/welcome']);
        },
        error => {
          console.error('Login error', error);
        }
      );
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { map, debounceTime, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  standalone: true,
  styleUrls: ['./user-registration.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', 
        [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+$')],
        [this.usernameValidator.bind(this)]
      ],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      last_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm_password: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  usernameValidator(control: AbstractControl) {
    return of(control.value).pipe(
      debounceTime(500),
      switchMap(username => this.authService.checkUsername(username)),
      map(isTaken => (isTaken ? { usernameTaken: true } : null)),
      catchError(() => of(null))
    );
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirm_password').value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/welcome']);
        },
        error => {
          console.error('Registration error', error);
        }
      );
    }
  }
}

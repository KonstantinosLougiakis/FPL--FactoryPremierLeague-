import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { map, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';
import { Person, UserPerson } from 'src/app/shared/interfaces/person';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  standalone: true,
  styleUrls: ['./user-registration.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  userService = inject(UserService);

  constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {
    this.userService = authService
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', 
        [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+$')],
        // [this.usernameValidator.bind(this)]
      ],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      last_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      // confirm_password: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  usernameValidator(control: AbstractControl) {
    return of(control.value).pipe(
      debounceTime(500),
      switchMap(username => this.authService.checkUsername(username)),
      map(isTaken => (isTaken ? { usernameTaken: true } : null)),
      catchError(() => of(null))
    );
  }

  onSubmit(): void {
    if (this.registrationForm.valid) 
      {
        const user = this.registrationForm.value as UserPerson;
        // console.log(user);
      this.authService.register(user).subscribe(
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
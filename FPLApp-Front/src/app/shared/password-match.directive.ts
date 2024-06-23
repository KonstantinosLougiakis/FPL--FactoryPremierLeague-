import { AbstractControl, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirm_password');

    if (!passwordControl || !confirmPasswordControl) {
        return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
}

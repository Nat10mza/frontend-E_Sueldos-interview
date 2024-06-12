import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function atLeastOneLetterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasLetter = /[a-zA-Z]/.test(control.value);
    return !hasLetter ? { atLeastOneLetter: true } : null;
  };
}

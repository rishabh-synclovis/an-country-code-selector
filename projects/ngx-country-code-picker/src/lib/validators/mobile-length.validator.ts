import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Country } from '../country.model';

/**
 * Validates that a control's value (digits only) has a length within
 * the given country's minLength/maxLength range.
 *
 * Usage: mobileLengthValidator(() => this.selectedCountry)
 */
export function mobileLengthValidator(
  getCountry: () => Country | undefined
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const country = getCountry();
    const value = control.value;
    if (!country || value == null || value === '') {
      return null;
    }
    const digits = String(value).replace(/\D/g, '');
    if (digits.length < country.minLength || digits.length > country.maxLength) {
      return {
        mobileLength: {
          minLength: country.minLength,
          maxLength: country.maxLength,
          actualLength: digits.length,
        },
      };
    }
    return null;
  };
}

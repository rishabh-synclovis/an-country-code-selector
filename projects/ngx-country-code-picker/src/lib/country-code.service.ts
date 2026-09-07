import { Injectable } from '@angular/core';
import { Country } from './country.model';
import { COUNTRIES } from './data/countries.data';

@Injectable({ providedIn: 'root' })
export class CountryCodeService {
  /** All countries known to the library, sorted by name. */
  readonly countries: readonly Country[] = COUNTRIES;

  /** Find a country by its ISO 3166-1 alpha-2 code (case-insensitive). */
  getByIso2(iso2: string): Country | undefined {
    const code = iso2.toUpperCase();
    return this.countries.find((c) => c.iso2 === code);
  }

  /** Find countries by dial code, e.g. "+1" returns US, Canada, etc. */
  getByDialCode(dialCode: string): Country[] {
    return this.countries.filter((c) => c.dialCode === dialCode);
  }

  /** Case-insensitive substring search over country name, ISO2 code, and dial code. */
  search(term: string): Country[] {
    const query = term.trim().toLowerCase();
    if (!query) {
      return [...this.countries];
    }
    return this.countries.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.iso2.toLowerCase().includes(query) ||
        c.dialCode.includes(query.startsWith('+') ? query : `+${query}`) ||
        c.dialCode.replace('+', '').includes(query.replace('+', ''))
    );
  }

  /** Validate a national mobile number (digits only) against a country's min/max length. */
  isValidLength(country: Country, nationalNumber: string): boolean {
    const digits = nationalNumber.replace(/\D/g, '');
    return digits.length >= country.minLength && digits.length <= country.maxLength;
  }
}

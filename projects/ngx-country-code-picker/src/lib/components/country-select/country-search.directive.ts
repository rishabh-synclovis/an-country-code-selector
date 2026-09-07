import { Directive, HostListener, Inject, forwardRef } from '@angular/core';
import { CountrySelectComponent } from './country-select.component';

/**
 * Apply to your own <input> projected inside <ngx-country-select> to use it
 * as the search box instead of the library's built-in one. Only takes effect
 * when the host component's `customSearch` input is set to true:
 *
 *   <ngx-country-select [customSearch]="true">
 *     <input ngxCountrySearch placeholder="Search..." />
 *   </ngx-country-select>
 */
@Directive({
  selector: 'input[ngxCountrySearch]',
  standalone: true,
})
export class NgxCountrySearchDirective {
  constructor(
    @Inject(forwardRef(() => CountrySelectComponent))
    private readonly countrySelect: CountrySelectComponent
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.countrySelect.onSearch(value);
  }
}

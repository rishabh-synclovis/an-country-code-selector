# an-country-code-selector

Lightweight, dependency-free (beyond Angular itself) country code selection dropdown for Angular. Standalone component — no NgModule required.

## Features

- Country **name**, **flag** (unicode emoji, no image assets), **dial code**, and mobile number **minLength**/**maxLength**
- Standalone `<ngx-country-select>` dropdown with built-in search
- Implements `ControlValueAccessor` — works with `ngModel` and reactive forms out of the box
- `CountryCodeService` for programmatic lookup/search/validation
- `mobileLengthValidator` reactive-forms validator wired to the selected country's min/max length

## Install

```bash
npm install an-country-code-selector
```

## Usage

### Template-driven form

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountrySelectComponent, Country } from 'an-country-code-selector';

@Component({
  standalone: true,
  imports: [FormsModule, CountrySelectComponent],
  template: `
    <ngx-country-select [(ngModel)]="country" defaultIso2="IN"></ngx-country-select>
    <input
      type="tel"
      [(ngModel)]="mobile"
      [attr.maxlength]="country?.maxLength"
    />
  `,
})
export class ExampleComponent {
  country?: Country;
  mobile = '';
}
```

### Reactive form with length validation

```ts
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  CountrySelectComponent,
  CountryCodeService,
  mobileLengthValidator,
  Country,
} from 'an-country-code-selector';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CountrySelectComponent],
  template: `
    <form [formGroup]="form">
      <ngx-country-select
        formControlName="country"
        (countryChange)="onCountryChange($event)"
      ></ngx-country-select>
      <input type="tel" formControlName="mobile" />
      <div *ngIf="form.get('mobile')?.errors?.['mobileLength'] as err">
        Enter {{ err.minLength }}–{{ err.maxLength }} digits.
      </div>
    </form>
  `,
})
export class ExampleComponent {
  selectedCountry?: Country;

  form = this.fb.group({
    country: this.fb.control<Country | undefined>(undefined),
    mobile: this.fb.control('', [mobileLengthValidator(() => this.selectedCountry)]),
  });

  constructor(private fb: FormBuilder) {}

  onCountryChange(country: Country): void {
    this.selectedCountry = country;
    this.form.get('mobile')?.updateValueAndValidity();
  }
}
```

### Programmatic lookup

```ts
import { inject } from '@angular/core';
import { CountryCodeService } from 'an-country-code-selector';

const countryCodeService = inject(CountryCodeService);

countryCodeService.getByIso2('IN'); // { name: 'India', dialCode: '+91', ... }
countryCodeService.search('united');
countryCodeService.isValidLength(country, '9876543210');
```

## API

### `Country`

| Field       | Type   | Description                                   |
| ----------- | ------ | ---------------------------------------------- |
| `name`      | string | Common country name                            |
| `iso2`      | string | ISO 3166-1 alpha-2 code                        |
| `flag`      | string | Unicode emoji flag                             |
| `dialCode`  | string | International dial code, e.g. `+91`            |
| `minLength` | number | Minimum national mobile number digit count     |
| `maxLength` | number | Maximum national mobile number digit count     |

### `CountrySelectComponent` (`ngx-country-select`)

Inputs: `defaultIso2`, `disabled`, `placeholder`
Outputs: `countryChange`
Supports `ngModel` / `formControlName` (emits/accepts a `Country`).

### `CountryCodeService`

`countries`, `getByIso2()`, `getByDialCode()`, `search()`, `isValidLength()`

## Building

```bash
ng build ngx-country-code-picker
```

Build artifacts are placed in `dist/ngx-country-code-picker`, ready for `npm publish` from that directory.

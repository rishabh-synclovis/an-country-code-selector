# an-country-code-selector

Lightweight, dependency-free (beyond Angular itself) country code selection dropdown for Angular. Standalone component — no NgModule required.

## Features

- Country **name**, **flag** (unicode emoji, no image assets), **dial code**, and mobile number **minLength**/**maxLength**
- Standalone `<ngx-country-select>` dropdown — trigger shows the flag only by default (opt into `showDialCode` for flag+code); built-in search box by default (opt into `customSearch` to project your own input)
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

### Using your own search input, and showing the dial code

Both are opt-in, off by default:

- `[customSearch]="true"` — renders the `<input ngxCountrySearch>` you project inside `<ngx-country-select>` instead of the library's built-in search box. When `false` (default), any projected `ngxCountrySearch` input is ignored and the built-in box is used.
- `[showDialCode]="true"` — the closed trigger shows flag + dial code (e.g. `🇮🇳 +91`) and is sized wider (`--ngx-ccp-trigger-dial-min-width`, default `90px`). When `false` (default), the trigger shows the flag only and is narrower (`--ngx-ccp-trigger-min-width`, default `46px`) — the trigger shrinks automatically when there's no dial code to show.

```ts
import { CountrySelectComponent, NgxCountrySearchDirective } from 'an-country-code-selector';

@Component({
  standalone: true,
  imports: [CountrySelectComponent, NgxCountrySearchDirective],
  template: `
    <ngx-country-select [(ngModel)]="country" [customSearch]="true" [showDialCode]="true">
      <input ngxCountrySearch type="text" class="my-own-styles" placeholder="Search…" />
    </ngx-country-select>
  `,
})
export class ExampleComponent {
  country?: Country;
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

## Styling / customization

The component's markup carries no hardcoded visual values — every color, spacing, border, radius, size, and shadow reads from a `--ngx-ccp-*` CSS custom property with a sensible default. Override any of them from your own stylesheet (they pierce Angular's view encapsulation, no `::ng-deep` or `!important` needed):

```css
/* your global styles, or a class on the host element */
ngx-country-select {
  --ngx-ccp-trigger-bg: #1e1e2e;
  --ngx-ccp-trigger-border: 1px solid #444;
  --ngx-ccp-trigger-radius: 999px;
  --ngx-ccp-text-color: #eee;
  --ngx-ccp-panel-bg: #1e1e2e;
  --ngx-ccp-option-hover-bg: #33334d;
}
```

| Variable                             | Default                        | Affects                              |
| ------------------------------------- | ------------------------------- | ------------------------------------- |
| `--ngx-ccp-font-family`               | `inherit`                      | Whole component                       |
| `--ngx-ccp-font-size`                 | `14px`                         | Whole component                       |
| `--ngx-ccp-text-color`                | `inherit`                      | Whole component's text color          |
| `--ngx-ccp-disabled-opacity`          | `0.5`                          | Opacity when `disabled`               |
| `--ngx-ccp-trigger-gap`               | `6px`                          | Trigger button                        |
| `--ngx-ccp-trigger-padding`           | `6px 10px`                     | Trigger button                        |
| `--ngx-ccp-trigger-border`            | `1px solid #ccc`               | Trigger button                        |
| `--ngx-ccp-trigger-radius`            | `6px`                          | Trigger button                        |
| `--ngx-ccp-trigger-bg`                | `#fff`                         | Trigger button                        |
| `--ngx-ccp-trigger-min-width`         | `46px`                         | Trigger width when `showDialCode` is `false` (flag only) |
| `--ngx-ccp-trigger-dial-min-width`    | `90px`                         | Trigger width when `showDialCode` is `true` (flag + code) |
| `--ngx-ccp-placeholder-color`         | `#888`                         | "Select country" placeholder, empty-state text |
| `--ngx-ccp-caret-margin-left`         | `auto`                         | Dropdown caret                        |
| `--ngx-ccp-caret-size`                | `10px`                         | Dropdown caret                        |
| `--ngx-ccp-caret-color`               | `#888`                         | Dropdown caret                        |
| `--ngx-ccp-panel-gap`                 | `4px`                          | Space between trigger and panel       |
| `--ngx-ccp-panel-z-index`             | `1000`                        | Dropdown panel stacking               |
| `--ngx-ccp-panel-width`               | `260px`                        | Dropdown panel                        |
| `--ngx-ccp-panel-max-height`          | `320px`                        | Dropdown panel                        |
| `--ngx-ccp-panel-bg`                  | `#fff`                         | Dropdown panel                        |
| `--ngx-ccp-panel-border`              | `1px solid #ccc`               | Dropdown panel                        |
| `--ngx-ccp-panel-radius`              | `6px`                          | Dropdown panel                        |
| `--ngx-ccp-panel-shadow`              | `0 4px 16px rgba(0,0,0,.12)`   | Dropdown panel                        |
| `--ngx-ccp-search-padding`            | `8px 10px`                     | Built-in search box                   |
| `--ngx-ccp-search-border-bottom`      | `1px solid #eee`               | Built-in search box                   |
| `--ngx-ccp-search-font-size`          | `14px`                         | Built-in search box                   |
| `--ngx-ccp-search-bg`                 | `transparent`                  | Built-in search box                   |
| `--ngx-ccp-list-padding`              | `4px 0`                        | Option list                           |
| `--ngx-ccp-option-gap`                | `8px`                          | Each option row                       |
| `--ngx-ccp-option-padding`            | `6px 10px`                     | Each option row                       |
| `--ngx-ccp-option-hover-bg`           | `#f0f4ff`                     | Hovered/active option row             |
| `--ngx-ccp-dial-color`                | `#666`                         | Dial code text in the option list     |
| `--ngx-ccp-empty-padding`             | `10px`                         | "No matches" row                      |

If you need to go beyond CSS variables (different markup, icons instead of text, etc.), use `[customSearch]` to replace the search box and style the projected `<input>` however you like — the trigger and option list remain styleable via the variables above.

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

| Input          | Type      | Default | Description                                                          |
| -------------- | --------- | ------- | --------------------------------------------------------------------- |
| `defaultIso2`  | `string`  | —       | Preselected country, e.g. `"IN"`                                     |
| `disabled`     | `boolean` | `false` | Disables the control                                                 |
| `placeholder`  | `string`  | `'Search country or code'` | Built-in search box placeholder; ignored when `customSearch` is `true` |
| `customSearch` | `boolean` | `false` | Use your own projected `ngxCountrySearch` input instead of the built-in search box |
| `showDialCode` | `boolean` | `false` | Show flag + dial code on the trigger instead of flag only            |

Outputs: `countryChange`
Supports `ngModel` / `formControlName` (emits/accepts a `Country`).

### `NgxCountrySearchDirective` (`input[ngxCountrySearch]`)

Apply to your own `<input>` projected inside `<ngx-country-select>`. Only takes effect when the host's `customSearch` input is `true`.

### `CountryCodeService`

`countries`, `getByIso2()`, `getByDialCode()`, `search()`, `isValidLength()`

## Building

```bash
ng build ngx-country-code-picker
```

Build artifacts are placed in `dist/ngx-country-code-picker`, ready for `npm publish` from that directory.

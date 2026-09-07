# an-country-code-selector

Lightweight country code selection dropdown library for Angular — country **name**, **flag**, **dial code**, and mobile number **minLength**/**maxLength**, plus a standalone `<ngx-country-select>` dropdown component.

This repo is both the library (installable straight from GitHub — no npm registry needed) and its own Angular development workspace (demo app + build tooling).

## Install directly from GitHub

The compiled library (`fesm2022/`, `index.d.ts`) is committed at the repo root, so `npm install` can pull it straight from GitHub with no separate build step:

```bash
npm install github:rishabh-synclovis/an-country-code-selector
```

Or pin to a specific branch/tag/commit:

```bash
npm install github:rishabh-synclovis/an-country-code-selector#main
```

Or in `package.json`:

```json
"dependencies": {
  "an-country-code-selector": "github:rishabh-synclovis/an-country-code-selector"
}
```

Then import and use it exactly like any npm package (see usage examples below).

## Developing this repo

- Library source: [`projects/ngx-country-code-picker`](projects/ngx-country-code-picker)
- Demo app: [`projects/demo`](projects/demo)
- Compiled output consumed by GitHub installs: [`fesm2022/`](fesm2022) and [`index.d.ts`](index.d.ts) at the repo root

### Step 1 — Clone and install

```bash
git clone https://github.com/rishabh-synclovis/an-country-code-selector.git
cd an-country-code-selector
npm install
```

### Step 2 — Build the library

```bash
npm run build
```

This runs `ng build ngx-country-code-picker` (output to `dist/ngx-country-code-picker`) and then a `postbuild` step that copies the compiled `fesm2022/` and `index.d.ts` to the repo root — the files that make `npm install github:...` work without consumers needing to build anything.

> **Whenever you change the library source, run `npm run build` and commit the updated root `fesm2022/`/`index.d.ts` files** — GitHub installs use exactly what's checked into the repo.

### Step 3 — Run the demo app

```bash
ng serve demo
```

Open `http://localhost:4200/` (or the port printed in the terminal) to try the component live: default country selection, search, and dropdown selection.

> Rebuilt the library while `ng serve demo` is running? Restart `ng serve demo` — the dev server doesn't watch `dist/` automatically.

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

### Programmatic lookup (no UI component)

```ts
import { inject } from '@angular/core';
import { CountryCodeService } from 'an-country-code-selector';

const countryCodeService = inject(CountryCodeService);

countryCodeService.getByIso2('IN');       // { name: 'India', dialCode: '+91', ... }
countryCodeService.search('united');      // matches by name, ISO2, or dial code
countryCodeService.isValidLength(country, '9876543210');
```

## API reference

### `Country`

| Field       | Type   | Description                                 |
| ----------- | ------ | -------------------------------------------- |
| `name`      | string | Common country name                          |
| `iso2`      | string | ISO 3166-1 alpha-2 code                      |
| `flag`      | string | Unicode emoji flag                           |
| `dialCode`  | string | International dial code, e.g. `+91`          |
| `minLength` | number | Minimum national mobile number digit count   |
| `maxLength` | number | Maximum national mobile number digit count   |

### `CountrySelectComponent` (selector: `ngx-country-select`)

- Inputs: `defaultIso2`, `disabled`, `placeholder`
- Outputs: `countryChange`
- Supports `ngModel` / `formControlName` (emits/accepts a `Country`)

### `CountryCodeService`

`countries`, `getByIso2()`, `getByDialCode()`, `search()`, `isValidLength()`

### `mobileLengthValidator(getCountry)`

Reactive-forms `ValidatorFn` — pass a function returning the currently selected `Country`; sets a `mobileLength` error (`{ minLength, maxLength, actualLength }`) when the control's digit count is out of range.

## Releasing a new version (for GitHub installs)

1. Bump `"version"` in both `package.json` (repo root) and `projects/ngx-country-code-picker/package.json`.
2. Rebuild and sync the root compiled files:
   ```bash
   npm run build
   ```
3. Commit the result — this must include the regenerated `fesm2022/`, `index.d.ts`, and both `package.json` files:
   ```bash
   git add fesm2022 index.d.ts package.json projects/ngx-country-code-picker/package.json
   git commit -m "release: vX.Y.Z"
   git push
   ```
4. (Optional) Tag the release so consumers can pin to it:
   ```bash
   git tag vX.Y.Z
   git push --tags
   ```
   Consumers then install with `npm install github:rishabh-synclovis/an-country-code-selector#vX.Y.Z`.

## Publishing to the npm registry instead (optional)

```bash
cd projects/ngx-country-code-picker
# bump "version" in package.json
cd ../..
ng build ngx-country-code-picker
cd dist/ngx-country-code-picker
npm publish
```

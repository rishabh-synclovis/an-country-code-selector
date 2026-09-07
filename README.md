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

### Using your own search input, and showing the dial code

Both are opt-in, off by default:

- `[customSearch]="true"` — renders the `<input ngxCountrySearch>` you project inside `<ngx-country-select>` instead of the built-in search box. When `false` (default), the built-in box is used and any projected input is ignored.
- `[showDialCode]="true"` — the closed trigger shows flag + dial code (e.g. `🇮🇳 +91`) and is sized wider (`--ngx-ccp-trigger-dial-min-width`, default `90px`). When `false` (default), the trigger shows the flag only and shrinks to a narrower width (`--ngx-ccp-trigger-min-width`, default `46px`).

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

### Programmatic lookup (no UI component)

```ts
import { inject } from '@angular/core';
import { CountryCodeService } from 'an-country-code-selector';

const countryCodeService = inject(CountryCodeService);

countryCodeService.getByIso2('IN');       // { name: 'India', dialCode: '+91', ... }
countryCodeService.search('united');      // matches by name, ISO2, or dial code
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

| Input          | Type      | Default | Description                                                          |
| -------------- | --------- | ------- | --------------------------------------------------------------------- |
| `defaultIso2`  | `string`  | —       | Preselected country, e.g. `"IN"`                                     |
| `disabled`     | `boolean` | `false` | Disables the control                                                 |
| `placeholder`  | `string`  | `'Search country or code'` | Built-in search box placeholder; ignored when `customSearch` is `true` |
| `customSearch` | `boolean` | `false` | Use your own projected `ngxCountrySearch` input instead of the built-in search box |
| `showDialCode` | `boolean` | `false` | Show flag + dial code on the trigger instead of flag only            |

Outputs: `countryChange`
Supports `ngModel` / `formControlName` (emits/accepts a `Country`).

### `NgxCountrySearchDirective` (selector: `input[ngxCountrySearch]`)

Apply to your own `<input>` projected inside `<ngx-country-select>`. Only takes effect when the host's `customSearch` input is `true`.

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

import * as i0 from '@angular/core';
import { OnInit, EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor, ValidatorFn } from '@angular/forms';

/** A single country entry used by the picker. */
interface Country {
    /** Common country name, e.g. "India" */
    name: string;
    /** ISO 3166-1 alpha-2 code, e.g. "IN" */
    iso2: string;
    /** Unicode emoji flag derived from iso2, e.g. "🇮🇳" */
    flag: string;
    /** Dialing code including "+", e.g. "+91" */
    dialCode: string;
    /** Minimum length of the national mobile number (digits only, no dial code) */
    minLength: number;
    /** Maximum length of the national mobile number (digits only, no dial code) */
    maxLength: number;
}

declare class CountryCodeService {
    /** All countries known to the library, sorted by name. */
    readonly countries: readonly Country[];
    /** Find a country by its ISO 3166-1 alpha-2 code (case-insensitive). */
    getByIso2(iso2: string): Country | undefined;
    /** Find countries by dial code, e.g. "+1" returns US, Canada, etc. */
    getByDialCode(dialCode: string): Country[];
    /** Case-insensitive substring search over country name, ISO2 code, and dial code. */
    search(term: string): Country[];
    /** Validate a national mobile number (digits only) against a country's min/max length. */
    isValidLength(country: Country, nationalNumber: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CountryCodeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CountryCodeService>;
}

declare class CountrySelectComponent implements ControlValueAccessor, OnInit {
    private readonly countryCodeService;
    private readonly elementRef;
    /** Preselected ISO2 code, e.g. "IN". Overridden by writeValue() when used as a form control. */
    defaultIso2: string | undefined;
    /** Disable the control. */
    disabled: boolean;
    /** Placeholder shown in the search box. */
    placeholder: string;
    /** Emits the selected Country whenever it changes. */
    countryChange: EventEmitter<Country>;
    isOpen: boolean;
    searchTerm: string;
    selected: Country | undefined;
    filtered: readonly Country[];
    private valueWritten;
    private onChange;
    private onTouched;
    constructor(countryCodeService: CountryCodeService, elementRef: ElementRef<HTMLElement>);
    ngOnInit(): void;
    toggle(): void;
    onSearch(term: string): void;
    select(country: Country): void;
    onDocumentClick(event: MouseEvent): void;
    onEscape(): void;
    writeValue(value: Country | string | undefined | null): void;
    registerOnChange(fn: (value: Country | undefined) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CountrySelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CountrySelectComponent, "ngx-country-select", never, { "defaultIso2": { "alias": "defaultIso2"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; }, { "countryChange": "countryChange"; }, never, never, true, never>;
}

/**
 * Validates that a control's value (digits only) has a length within
 * the given country's minLength/maxLength range.
 *
 * Usage: mobileLengthValidator(() => this.selectedCountry)
 */
declare function mobileLengthValidator(getCountry: () => Country | undefined): ValidatorFn;

export { CountryCodeService, CountrySelectComponent, mobileLengthValidator };
export type { Country };

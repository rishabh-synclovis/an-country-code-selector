import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Country } from '../../country.model';
import { CountryCodeService } from '../../country-code.service';

@Component({
  selector: 'ngx-country-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country-select.component.html',
  styleUrl: './country-select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelectComponent),
      multi: true,
    },
  ],
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class CountrySelectComponent implements ControlValueAccessor, OnInit {
  /** Preselected ISO2 code, e.g. "IN". Overridden by writeValue() when used as a form control. */
  @Input() defaultIso2: string | undefined;

  /** Disable the control. */
  @Input() disabled = false;

  /** Placeholder shown in the search box. */
  @Input() placeholder = 'Search country or code';

  /** Emits the selected Country whenever it changes. */
  @Output() countryChange = new EventEmitter<Country>();

  isOpen = false;
  searchTerm = '';
  selected: Country | undefined;
  filtered: readonly Country[];

  private valueWritten = false;

  private onChange: (value: Country | undefined) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private readonly countryCodeService: CountryCodeService,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    this.filtered = this.countryCodeService.countries;
  }

  ngOnInit(): void {
    if (this.defaultIso2 && !this.valueWritten) {
      this.selected = this.countryCodeService.getByIso2(this.defaultIso2);
    }
  }

  toggle(): void {
    if (this.disabled) {
      return;
    }
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchTerm = '';
      this.filtered = this.countryCodeService.countries;
    } else {
      this.onTouched();
    }
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.filtered = this.countryCodeService.search(term);
  }

  select(country: Country): void {
    this.selected = country;
    this.isOpen = false;
    this.onChange(country);
    this.onTouched();
    this.countryChange.emit(country);
  }

  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen = false;
      this.onTouched();
    }
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    this.isOpen = false;
  }

  // --- ControlValueAccessor ---

  writeValue(value: Country | string | undefined | null): void {
    this.valueWritten = true;
    if (!value) {
      this.selected = this.defaultIso2 ? this.countryCodeService.getByIso2(this.defaultIso2) : undefined;
      return;
    }
    this.selected = typeof value === 'string' ? this.countryCodeService.getByIso2(value) : value;
  }

  registerOnChange(fn: (value: Country | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

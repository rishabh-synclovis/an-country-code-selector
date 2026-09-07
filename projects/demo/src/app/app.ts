import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountrySelectComponent, Country } from 'an-country-code-selector';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, CountrySelectComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('demo');
  country?: Country;
  mobile = '';

  onCountryChange(country: Country): void {
    this.country = country;
  }
}

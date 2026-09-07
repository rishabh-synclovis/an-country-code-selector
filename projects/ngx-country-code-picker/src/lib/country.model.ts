/** A single country entry used by the picker. */
export interface Country {
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

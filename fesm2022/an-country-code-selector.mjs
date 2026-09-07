import * as i0 from '@angular/core';
import { Injectable, EventEmitter, forwardRef, HostListener, Output, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/forms';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTRIES = [
    { name: 'Afghanistan', iso2: 'AF', flag: '🇦🇫', dialCode: '+93', minLength: 9, maxLength: 9 },
    { name: 'Albania', iso2: 'AL', flag: '🇦🇱', dialCode: '+355', minLength: 9, maxLength: 9 },
    { name: 'Algeria', iso2: 'DZ', flag: '🇩🇿', dialCode: '+213', minLength: 9, maxLength: 9 },
    { name: 'Andorra', iso2: 'AD', flag: '🇦🇩', dialCode: '+376', minLength: 6, maxLength: 6 },
    { name: 'Angola', iso2: 'AO', flag: '🇦🇴', dialCode: '+244', minLength: 9, maxLength: 9 },
    { name: 'Antigua and Barbuda', iso2: 'AG', flag: '🇦🇬', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'Argentina', iso2: 'AR', flag: '🇦🇷', dialCode: '+54', minLength: 10, maxLength: 10 },
    { name: 'Armenia', iso2: 'AM', flag: '🇦🇲', dialCode: '+374', minLength: 8, maxLength: 8 },
    { name: 'Australia', iso2: 'AU', flag: '🇦🇺', dialCode: '+61', minLength: 9, maxLength: 9 },
    { name: 'Austria', iso2: 'AT', flag: '🇦🇹', dialCode: '+43', minLength: 10, maxLength: 11 },
    { name: 'Azerbaijan', iso2: 'AZ', flag: '🇦🇿', dialCode: '+994', minLength: 9, maxLength: 9 },
    { name: 'Bahamas', iso2: 'BS', flag: '🇧🇸', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'Bahrain', iso2: 'BH', flag: '🇧🇭', dialCode: '+973', minLength: 8, maxLength: 8 },
    { name: 'Bangladesh', iso2: 'BD', flag: '🇧🇩', dialCode: '+880', minLength: 10, maxLength: 10 },
    { name: 'Barbados', iso2: 'BB', flag: '🇧🇧', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'Belarus', iso2: 'BY', flag: '🇧🇾', dialCode: '+375', minLength: 9, maxLength: 9 },
    { name: 'Belgium', iso2: 'BE', flag: '🇧🇪', dialCode: '+32', minLength: 9, maxLength: 9 },
    { name: 'Belize', iso2: 'BZ', flag: '🇧🇿', dialCode: '+501', minLength: 7, maxLength: 7 },
    { name: 'Benin', iso2: 'BJ', flag: '🇧🇯', dialCode: '+229', minLength: 8, maxLength: 8 },
    { name: 'Bhutan', iso2: 'BT', flag: '🇧🇹', dialCode: '+975', minLength: 8, maxLength: 8 },
    { name: 'Bolivia', iso2: 'BO', flag: '🇧🇴', dialCode: '+591', minLength: 8, maxLength: 8 },
    { name: 'Bosnia and Herzegovina', iso2: 'BA', flag: '🇧🇦', dialCode: '+387', minLength: 8, maxLength: 8 },
    { name: 'Botswana', iso2: 'BW', flag: '🇧🇼', dialCode: '+267', minLength: 8, maxLength: 8 },
    { name: 'Brazil', iso2: 'BR', flag: '🇧🇷', dialCode: '+55', minLength: 10, maxLength: 11 },
    { name: 'Brunei', iso2: 'BN', flag: '🇧🇳', dialCode: '+673', minLength: 7, maxLength: 7 },
    { name: 'Bulgaria', iso2: 'BG', flag: '🇧🇬', dialCode: '+359', minLength: 9, maxLength: 9 },
    { name: 'Burkina Faso', iso2: 'BF', flag: '🇧🇫', dialCode: '+226', minLength: 8, maxLength: 8 },
    { name: 'Burundi', iso2: 'BI', flag: '🇧🇮', dialCode: '+257', minLength: 8, maxLength: 8 },
    { name: 'Cabo Verde', iso2: 'CV', flag: '🇨🇻', dialCode: '+238', minLength: 7, maxLength: 7 },
    { name: 'Cambodia', iso2: 'KH', flag: '🇰🇭', dialCode: '+855', minLength: 8, maxLength: 9 },
    { name: 'Cameroon', iso2: 'CM', flag: '🇨🇲', dialCode: '+237', minLength: 9, maxLength: 9 },
    { name: 'Canada', iso2: 'CA', flag: '🇨🇦', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'Central African Republic', iso2: 'CF', flag: '🇨🇫', dialCode: '+236', minLength: 8, maxLength: 8 },
    { name: 'Chad', iso2: 'TD', flag: '🇹🇩', dialCode: '+235', minLength: 8, maxLength: 8 },
    { name: 'Chile', iso2: 'CL', flag: '🇨🇱', dialCode: '+56', minLength: 9, maxLength: 9 },
    { name: 'China', iso2: 'CN', flag: '🇨🇳', dialCode: '+86', minLength: 11, maxLength: 11 },
    { name: 'Colombia', iso2: 'CO', flag: '🇨🇴', dialCode: '+57', minLength: 10, maxLength: 10 },
    { name: 'Comoros', iso2: 'KM', flag: '🇰🇲', dialCode: '+269', minLength: 7, maxLength: 7 },
    { name: 'Congo (Brazzaville)', iso2: 'CG', flag: '🇨🇬', dialCode: '+242', minLength: 9, maxLength: 9 },
    { name: 'Congo (DRC)', iso2: 'CD', flag: '🇨🇩', dialCode: '+243', minLength: 9, maxLength: 9 },
    { name: 'Costa Rica', iso2: 'CR', flag: '🇨🇷', dialCode: '+506', minLength: 8, maxLength: 8 },
    { name: 'Croatia', iso2: 'HR', flag: '🇭🇷', dialCode: '+385', minLength: 9, maxLength: 9 },
    { name: 'Cuba', iso2: 'CU', flag: '🇨🇺', dialCode: '+53', minLength: 8, maxLength: 8 },
    { name: 'Cyprus', iso2: 'CY', flag: '🇨🇾', dialCode: '+357', minLength: 8, maxLength: 8 },
    { name: 'Czech Republic', iso2: 'CZ', flag: '🇨🇿', dialCode: '+420', minLength: 9, maxLength: 9 },
    { name: 'Denmark', iso2: 'DK', flag: '🇩🇰', dialCode: '+45', minLength: 8, maxLength: 8 },
    { name: 'Djibouti', iso2: 'DJ', flag: '🇩🇯', dialCode: '+253', minLength: 8, maxLength: 8 },
    { name: 'Dominica', iso2: 'DM', flag: '🇩🇲', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'Dominican Republic', iso2: 'DO', flag: '🇩🇴', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'East Timor', iso2: 'TL', flag: '🇹🇱', dialCode: '+670', minLength: 8, maxLength: 8 },
    { name: 'Ecuador', iso2: 'EC', flag: '🇪🇨', dialCode: '+593', minLength: 9, maxLength: 9 },
    { name: 'Egypt', iso2: 'EG', flag: '🇪🇬', dialCode: '+20', minLength: 10, maxLength: 10 },
    { name: 'El Salvador', iso2: 'SV', flag: '🇸🇻', dialCode: '+503', minLength: 8, maxLength: 8 },
    { name: 'Equatorial Guinea', iso2: 'GQ', flag: '🇬🇶', dialCode: '+240', minLength: 9, maxLength: 9 },
    { name: 'Eritrea', iso2: 'ER', flag: '🇪🇷', dialCode: '+291', minLength: 7, maxLength: 7 },
    { name: 'Estonia', iso2: 'EE', flag: '🇪🇪', dialCode: '+372', minLength: 7, maxLength: 8 },
    { name: 'Eswatini', iso2: 'SZ', flag: '🇸🇿', dialCode: '+268', minLength: 8, maxLength: 8 },
    { name: 'Ethiopia', iso2: 'ET', flag: '🇪🇹', dialCode: '+251', minLength: 9, maxLength: 9 },
    { name: 'Fiji', iso2: 'FJ', flag: '🇫🇯', dialCode: '+679', minLength: 7, maxLength: 7 },
    { name: 'Finland', iso2: 'FI', flag: '🇫🇮', dialCode: '+358', minLength: 9, maxLength: 10 },
    { name: 'France', iso2: 'FR', flag: '🇫🇷', dialCode: '+33', minLength: 9, maxLength: 9 },
    { name: 'Gabon', iso2: 'GA', flag: '🇬🇦', dialCode: '+241', minLength: 8, maxLength: 8 },
    { name: 'Gambia', iso2: 'GM', flag: '🇬🇲', dialCode: '+220', minLength: 7, maxLength: 7 },
    { name: 'Georgia', iso2: 'GE', flag: '🇬🇪', dialCode: '+995', minLength: 9, maxLength: 9 },
    { name: 'Germany', iso2: 'DE', flag: '🇩🇪', dialCode: '+49', minLength: 10, maxLength: 11 },
    { name: 'Ghana', iso2: 'GH', flag: '🇬🇭', dialCode: '+233', minLength: 9, maxLength: 9 },
    { name: 'Greece', iso2: 'GR', flag: '🇬🇷', dialCode: '+30', minLength: 10, maxLength: 10 },
    { name: 'Grenada', iso2: 'GD', flag: '🇬🇩', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'Guatemala', iso2: 'GT', flag: '🇬🇹', dialCode: '+502', minLength: 8, maxLength: 8 },
    { name: 'Guinea', iso2: 'GN', flag: '🇬🇳', dialCode: '+224', minLength: 9, maxLength: 9 },
    { name: 'Guinea-Bissau', iso2: 'GW', flag: '🇬🇼', dialCode: '+245', minLength: 7, maxLength: 7 },
    { name: 'Guyana', iso2: 'GY', flag: '🇬🇾', dialCode: '+592', minLength: 7, maxLength: 7 },
    { name: 'Haiti', iso2: 'HT', flag: '🇭🇹', dialCode: '+509', minLength: 8, maxLength: 8 },
    { name: 'Honduras', iso2: 'HN', flag: '🇭🇳', dialCode: '+504', minLength: 8, maxLength: 8 },
    { name: 'Hong Kong', iso2: 'HK', flag: '🇭🇰', dialCode: '+852', minLength: 8, maxLength: 8 },
    { name: 'Hungary', iso2: 'HU', flag: '🇭🇺', dialCode: '+36', minLength: 9, maxLength: 9 },
    { name: 'Iceland', iso2: 'IS', flag: '🇮🇸', dialCode: '+354', minLength: 7, maxLength: 7 },
    { name: 'India', iso2: 'IN', flag: '🇮🇳', dialCode: '+91', minLength: 10, maxLength: 10 },
    { name: 'Indonesia', iso2: 'ID', flag: '🇮🇩', dialCode: '+62', minLength: 9, maxLength: 12 },
    { name: 'Iran', iso2: 'IR', flag: '🇮🇷', dialCode: '+98', minLength: 10, maxLength: 10 },
    { name: 'Iraq', iso2: 'IQ', flag: '🇮🇶', dialCode: '+964', minLength: 10, maxLength: 10 },
    { name: 'Ireland', iso2: 'IE', flag: '🇮🇪', dialCode: '+353', minLength: 9, maxLength: 9 },
    { name: 'Israel', iso2: 'IL', flag: '🇮🇱', dialCode: '+972', minLength: 9, maxLength: 9 },
    { name: 'Italy', iso2: 'IT', flag: '🇮🇹', dialCode: '+39', minLength: 9, maxLength: 10 },
    { name: 'Ivory Coast', iso2: 'CI', flag: '🇨🇮', dialCode: '+225', minLength: 10, maxLength: 10 },
    { name: 'Jamaica', iso2: 'JM', flag: '🇯🇲', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'Japan', iso2: 'JP', flag: '🇯🇵', dialCode: '+81', minLength: 10, maxLength: 11 },
    { name: 'Jordan', iso2: 'JO', flag: '🇯🇴', dialCode: '+962', minLength: 9, maxLength: 9 },
    { name: 'Kazakhstan', iso2: 'KZ', flag: '🇰🇿', dialCode: '+7', minLength: 10, maxLength: 10 },
    { name: 'Kenya', iso2: 'KE', flag: '🇰🇪', dialCode: '+254', minLength: 9, maxLength: 9 },
    { name: 'Kiribati', iso2: 'KI', flag: '🇰🇮', dialCode: '+686', minLength: 8, maxLength: 8 },
    { name: 'Kosovo', iso2: 'XK', flag: '🇽🇰', dialCode: '+383', minLength: 8, maxLength: 8 },
    { name: 'Kuwait', iso2: 'KW', flag: '🇰🇼', dialCode: '+965', minLength: 8, maxLength: 8 },
    { name: 'Kyrgyzstan', iso2: 'KG', flag: '🇰🇬', dialCode: '+996', minLength: 9, maxLength: 9 },
    { name: 'Laos', iso2: 'LA', flag: '🇱🇦', dialCode: '+856', minLength: 9, maxLength: 10 },
    { name: 'Latvia', iso2: 'LV', flag: '🇱🇻', dialCode: '+371', minLength: 8, maxLength: 8 },
    { name: 'Lebanon', iso2: 'LB', flag: '🇱🇧', dialCode: '+961', minLength: 7, maxLength: 8 },
    { name: 'Lesotho', iso2: 'LS', flag: '🇱🇸', dialCode: '+266', minLength: 8, maxLength: 8 },
    { name: 'Liberia', iso2: 'LR', flag: '🇱🇷', dialCode: '+231', minLength: 8, maxLength: 9 },
    { name: 'Libya', iso2: 'LY', flag: '🇱🇾', dialCode: '+218', minLength: 9, maxLength: 9 },
    { name: 'Liechtenstein', iso2: 'LI', flag: '🇱🇮', dialCode: '+423', minLength: 7, maxLength: 7 },
    { name: 'Lithuania', iso2: 'LT', flag: '🇱🇹', dialCode: '+370', minLength: 8, maxLength: 8 },
    { name: 'Luxembourg', iso2: 'LU', flag: '🇱🇺', dialCode: '+352', minLength: 9, maxLength: 9 },
    { name: 'Macau', iso2: 'MO', flag: '🇲🇴', dialCode: '+853', minLength: 8, maxLength: 8 },
    { name: 'Madagascar', iso2: 'MG', flag: '🇲🇬', dialCode: '+261', minLength: 9, maxLength: 9 },
    { name: 'Malawi', iso2: 'MW', flag: '🇲🇼', dialCode: '+265', minLength: 9, maxLength: 9 },
    { name: 'Malaysia', iso2: 'MY', flag: '🇲🇾', dialCode: '+60', minLength: 9, maxLength: 10 },
    { name: 'Maldives', iso2: 'MV', flag: '🇲🇻', dialCode: '+960', minLength: 7, maxLength: 7 },
    { name: 'Mali', iso2: 'ML', flag: '🇲🇱', dialCode: '+223', minLength: 8, maxLength: 8 },
    { name: 'Malta', iso2: 'MT', flag: '🇲🇹', dialCode: '+356', minLength: 8, maxLength: 8 },
    { name: 'Marshall Islands', iso2: 'MH', flag: '🇲🇭', dialCode: '+692', minLength: 7, maxLength: 7 },
    { name: 'Mauritania', iso2: 'MR', flag: '🇲🇷', dialCode: '+222', minLength: 8, maxLength: 8 },
    { name: 'Mauritius', iso2: 'MU', flag: '🇲🇺', dialCode: '+230', minLength: 8, maxLength: 8 },
    { name: 'Mexico', iso2: 'MX', flag: '🇲🇽', dialCode: '+52', minLength: 10, maxLength: 10 },
    { name: 'Micronesia', iso2: 'FM', flag: '🇫🇲', dialCode: '+691', minLength: 7, maxLength: 7 },
    { name: 'Moldova', iso2: 'MD', flag: '🇲🇩', dialCode: '+373', minLength: 8, maxLength: 8 },
    { name: 'Monaco', iso2: 'MC', flag: '🇲🇨', dialCode: '+377', minLength: 8, maxLength: 9 },
    { name: 'Mongolia', iso2: 'MN', flag: '🇲🇳', dialCode: '+976', minLength: 8, maxLength: 8 },
    { name: 'Montenegro', iso2: 'ME', flag: '🇲🇪', dialCode: '+382', minLength: 8, maxLength: 8 },
    { name: 'Morocco', iso2: 'MA', flag: '🇲🇦', dialCode: '+212', minLength: 9, maxLength: 9 },
    { name: 'Mozambique', iso2: 'MZ', flag: '🇲🇿', dialCode: '+258', minLength: 9, maxLength: 9 },
    { name: 'Myanmar', iso2: 'MM', flag: '🇲🇲', dialCode: '+95', minLength: 8, maxLength: 10 },
    { name: 'Namibia', iso2: 'NA', flag: '🇳🇦', dialCode: '+264', minLength: 9, maxLength: 9 },
    { name: 'Nauru', iso2: 'NR', flag: '🇳🇷', dialCode: '+674', minLength: 7, maxLength: 7 },
    { name: 'Nepal', iso2: 'NP', flag: '🇳🇵', dialCode: '+977', minLength: 10, maxLength: 10 },
    { name: 'Netherlands', iso2: 'NL', flag: '🇳🇱', dialCode: '+31', minLength: 9, maxLength: 9 },
    { name: 'New Zealand', iso2: 'NZ', flag: '🇳🇿', dialCode: '+64', minLength: 8, maxLength: 9 },
    { name: 'Nicaragua', iso2: 'NI', flag: '🇳🇮', dialCode: '+505', minLength: 8, maxLength: 8 },
    { name: 'Niger', iso2: 'NE', flag: '🇳🇪', dialCode: '+227', minLength: 8, maxLength: 8 },
    { name: 'Nigeria', iso2: 'NG', flag: '🇳🇬', dialCode: '+234', minLength: 10, maxLength: 10 },
    { name: 'North Korea', iso2: 'KP', flag: '🇰🇵', dialCode: '+850', minLength: 8, maxLength: 10 },
    { name: 'North Macedonia', iso2: 'MK', flag: '🇲🇰', dialCode: '+389', minLength: 8, maxLength: 8 },
    { name: 'Norway', iso2: 'NO', flag: '🇳🇴', dialCode: '+47', minLength: 8, maxLength: 8 },
    { name: 'Oman', iso2: 'OM', flag: '🇴🇲', dialCode: '+968', minLength: 8, maxLength: 8 },
    { name: 'Pakistan', iso2: 'PK', flag: '🇵🇰', dialCode: '+92', minLength: 10, maxLength: 10 },
    { name: 'Palau', iso2: 'PW', flag: '🇵🇼', dialCode: '+680', minLength: 7, maxLength: 7 },
    { name: 'Palestine', iso2: 'PS', flag: '🇵🇸', dialCode: '+970', minLength: 9, maxLength: 9 },
    { name: 'Panama', iso2: 'PA', flag: '🇵🇦', dialCode: '+507', minLength: 8, maxLength: 8 },
    { name: 'Papua New Guinea', iso2: 'PG', flag: '🇵🇬', dialCode: '+675', minLength: 8, maxLength: 8 },
    { name: 'Paraguay', iso2: 'PY', flag: '🇵🇾', dialCode: '+595', minLength: 9, maxLength: 9 },
    { name: 'Peru', iso2: 'PE', flag: '🇵🇪', dialCode: '+51', minLength: 9, maxLength: 9 },
    { name: 'Philippines', iso2: 'PH', flag: '🇵🇭', dialCode: '+63', minLength: 10, maxLength: 10 },
    { name: 'Poland', iso2: 'PL', flag: '🇵🇱', dialCode: '+48', minLength: 9, maxLength: 9 },
    { name: 'Portugal', iso2: 'PT', flag: '🇵🇹', dialCode: '+351', minLength: 9, maxLength: 9 },
    { name: 'Puerto Rico', iso2: 'PR', flag: '🇵🇷', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'Qatar', iso2: 'QA', flag: '🇶🇦', dialCode: '+974', minLength: 8, maxLength: 8 },
    { name: 'Romania', iso2: 'RO', flag: '🇷🇴', dialCode: '+40', minLength: 9, maxLength: 9 },
    { name: 'Russia', iso2: 'RU', flag: '🇷🇺', dialCode: '+7', minLength: 10, maxLength: 10 },
    { name: 'Rwanda', iso2: 'RW', flag: '🇷🇼', dialCode: '+250', minLength: 9, maxLength: 9 },
    { name: 'Saint Kitts and Nevis', iso2: 'KN', flag: '🇰🇳', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'Saint Lucia', iso2: 'LC', flag: '🇱🇨', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'Saint Vincent and the Grenadines', iso2: 'VC', flag: '🇻🇨', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'Samoa', iso2: 'WS', flag: '🇼🇸', dialCode: '+685', minLength: 7, maxLength: 7 },
    { name: 'San Marino', iso2: 'SM', flag: '🇸🇲', dialCode: '+378', minLength: 10, maxLength: 10 },
    { name: 'Sao Tome and Principe', iso2: 'ST', flag: '🇸🇹', dialCode: '+239', minLength: 7, maxLength: 7 },
    { name: 'Saudi Arabia', iso2: 'SA', flag: '🇸🇦', dialCode: '+966', minLength: 9, maxLength: 9 },
    { name: 'Senegal', iso2: 'SN', flag: '🇸🇳', dialCode: '+221', minLength: 9, maxLength: 9 },
    { name: 'Serbia', iso2: 'RS', flag: '🇷🇸', dialCode: '+381', minLength: 8, maxLength: 9 },
    { name: 'Seychelles', iso2: 'SC', flag: '🇸🇨', dialCode: '+248', minLength: 7, maxLength: 7 },
    { name: 'Sierra Leone', iso2: 'SL', flag: '🇸🇱', dialCode: '+232', minLength: 8, maxLength: 8 },
    { name: 'Singapore', iso2: 'SG', flag: '🇸🇬', dialCode: '+65', minLength: 8, maxLength: 8 },
    { name: 'Slovakia', iso2: 'SK', flag: '🇸🇰', dialCode: '+421', minLength: 9, maxLength: 9 },
    { name: 'Slovenia', iso2: 'SI', flag: '🇸🇮', dialCode: '+386', minLength: 8, maxLength: 8 },
    { name: 'Solomon Islands', iso2: 'SB', flag: '🇸🇧', dialCode: '+677', minLength: 7, maxLength: 7 },
    { name: 'Somalia', iso2: 'SO', flag: '🇸🇴', dialCode: '+252', minLength: 8, maxLength: 9 },
    { name: 'South Africa', iso2: 'ZA', flag: '🇿🇦', dialCode: '+27', minLength: 9, maxLength: 9 },
    { name: 'South Korea', iso2: 'KR', flag: '🇰🇷', dialCode: '+82', minLength: 9, maxLength: 10 },
    { name: 'South Sudan', iso2: 'SS', flag: '🇸🇸', dialCode: '+211', minLength: 9, maxLength: 9 },
    { name: 'Spain', iso2: 'ES', flag: '🇪🇸', dialCode: '+34', minLength: 9, maxLength: 9 },
    { name: 'Sri Lanka', iso2: 'LK', flag: '🇱🇰', dialCode: '+94', minLength: 9, maxLength: 9 },
    { name: 'Sudan', iso2: 'SD', flag: '🇸🇩', dialCode: '+249', minLength: 9, maxLength: 9 },
    { name: 'Suriname', iso2: 'SR', flag: '🇸🇷', dialCode: '+597', minLength: 7, maxLength: 7 },
    { name: 'Sweden', iso2: 'SE', flag: '🇸🇪', dialCode: '+46', minLength: 9, maxLength: 9 },
    { name: 'Switzerland', iso2: 'CH', flag: '🇨🇭', dialCode: '+41', minLength: 9, maxLength: 9 },
    { name: 'Syria', iso2: 'SY', flag: '🇸🇾', dialCode: '+963', minLength: 9, maxLength: 9 },
    { name: 'Taiwan', iso2: 'TW', flag: '🇹🇼', dialCode: '+886', minLength: 9, maxLength: 9 },
    { name: 'Tajikistan', iso2: 'TJ', flag: '🇹🇯', dialCode: '+992', minLength: 9, maxLength: 9 },
    { name: 'Tanzania', iso2: 'TZ', flag: '🇹🇿', dialCode: '+255', minLength: 9, maxLength: 9 },
    { name: 'Thailand', iso2: 'TH', flag: '🇹🇭', dialCode: '+66', minLength: 9, maxLength: 9 },
    { name: 'Togo', iso2: 'TG', flag: '🇹🇬', dialCode: '+228', minLength: 8, maxLength: 8 },
    { name: 'Tonga', iso2: 'TO', flag: '🇹🇴', dialCode: '+676', minLength: 7, maxLength: 7 },
    { name: 'Trinidad and Tobago', iso2: 'TT', flag: '🇹🇹', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'Tunisia', iso2: 'TN', flag: '🇹🇳', dialCode: '+216', minLength: 8, maxLength: 8 },
    { name: 'Turkey', iso2: 'TR', flag: '🇹🇷', dialCode: '+90', minLength: 10, maxLength: 10 },
    { name: 'Turkmenistan', iso2: 'TM', flag: '🇹🇲', dialCode: '+993', minLength: 8, maxLength: 8 },
    { name: 'Tuvalu', iso2: 'TV', flag: '🇹🇻', dialCode: '+688', minLength: 6, maxLength: 6 },
    { name: 'Uganda', iso2: 'UG', flag: '🇺🇬', dialCode: '+256', minLength: 9, maxLength: 9 },
    { name: 'Ukraine', iso2: 'UA', flag: '🇺🇦', dialCode: '+380', minLength: 9, maxLength: 9 },
    { name: 'United Arab Emirates', iso2: 'AE', flag: '🇦🇪', dialCode: '+971', minLength: 9, maxLength: 9 },
    { name: 'United Kingdom', iso2: 'GB', flag: '🇬🇧', dialCode: '+44', minLength: 10, maxLength: 10 },
    { name: 'United States', iso2: 'US', flag: '🇺🇸', dialCode: '+1', minLength: 10, maxLength: 10 },
    { name: 'Uruguay', iso2: 'UY', flag: '🇺🇾', dialCode: '+598', minLength: 8, maxLength: 8 },
    { name: 'Uzbekistan', iso2: 'UZ', flag: '🇺🇿', dialCode: '+998', minLength: 9, maxLength: 9 },
    { name: 'Vanuatu', iso2: 'VU', flag: '🇻🇺', dialCode: '+678', minLength: 7, maxLength: 7 },
    { name: 'Vatican City', iso2: 'VA', flag: '🇻🇦', dialCode: '+379', minLength: 10, maxLength: 10 },
    { name: 'Venezuela', iso2: 'VE', flag: '🇻🇪', dialCode: '+58', minLength: 10, maxLength: 10 },
    { name: 'Vietnam', iso2: 'VN', flag: '🇻🇳', dialCode: '+84', minLength: 9, maxLength: 10 },
    { name: 'Yemen', iso2: 'YE', flag: '🇾🇪', dialCode: '+967', minLength: 9, maxLength: 9 },
    { name: 'Zambia', iso2: 'ZM', flag: '🇿🇲', dialCode: '+260', minLength: 9, maxLength: 9 },
    { name: 'Zimbabwe', iso2: 'ZW', flag: '🇿🇼', dialCode: '+263', minLength: 9, maxLength: 9 },
];

class CountryCodeService {
    /** All countries known to the library, sorted by name. */
    countries = COUNTRIES;
    /** Find a country by its ISO 3166-1 alpha-2 code (case-insensitive). */
    getByIso2(iso2) {
        const code = iso2.toUpperCase();
        return this.countries.find((c) => c.iso2 === code);
    }
    /** Find countries by dial code, e.g. "+1" returns US, Canada, etc. */
    getByDialCode(dialCode) {
        return this.countries.filter((c) => c.dialCode === dialCode);
    }
    /** Case-insensitive substring search over country name, ISO2 code, and dial code. */
    search(term) {
        const query = term.trim().toLowerCase();
        if (!query) {
            return [...this.countries];
        }
        return this.countries.filter((c) => c.name.toLowerCase().includes(query) ||
            c.iso2.toLowerCase().includes(query) ||
            c.dialCode.includes(query.startsWith('+') ? query : `+${query}`) ||
            c.dialCode.replace('+', '').includes(query.replace('+', '')));
    }
    /** Validate a national mobile number (digits only) against a country's min/max length. */
    isValidLength(country, nationalNumber) {
        const digits = nationalNumber.replace(/\D/g, '');
        return digits.length >= country.minLength && digits.length <= country.maxLength;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: CountryCodeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: CountryCodeService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: CountryCodeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class CountrySelectComponent {
    countryCodeService;
    elementRef;
    /** Preselected ISO2 code, e.g. "IN". Overridden by writeValue() when used as a form control. */
    defaultIso2;
    /** Disable the control. */
    disabled = false;
    /** Placeholder shown in the search box. */
    placeholder = 'Search country or code';
    /** Emits the selected Country whenever it changes. */
    countryChange = new EventEmitter();
    isOpen = false;
    searchTerm = '';
    selected;
    filtered;
    valueWritten = false;
    onChange = () => { };
    onTouched = () => { };
    constructor(countryCodeService, elementRef) {
        this.countryCodeService = countryCodeService;
        this.elementRef = elementRef;
        this.filtered = this.countryCodeService.countries;
    }
    ngOnInit() {
        if (this.defaultIso2 && !this.valueWritten) {
            this.selected = this.countryCodeService.getByIso2(this.defaultIso2);
        }
    }
    toggle() {
        if (this.disabled) {
            return;
        }
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.searchTerm = '';
            this.filtered = this.countryCodeService.countries;
        }
        else {
            this.onTouched();
        }
    }
    onSearch(term) {
        this.searchTerm = term;
        this.filtered = this.countryCodeService.search(term);
    }
    select(country) {
        this.selected = country;
        this.isOpen = false;
        this.onChange(country);
        this.onTouched();
        this.countryChange.emit(country);
    }
    onDocumentClick(event) {
        if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
            this.onTouched();
        }
    }
    onEscape() {
        this.isOpen = false;
    }
    // --- ControlValueAccessor ---
    writeValue(value) {
        this.valueWritten = true;
        if (!value) {
            this.selected = this.defaultIso2 ? this.countryCodeService.getByIso2(this.defaultIso2) : undefined;
            return;
        }
        this.selected = typeof value === 'string' ? this.countryCodeService.getByIso2(value) : value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: CountrySelectComponent, deps: [{ token: CountryCodeService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: CountrySelectComponent, isStandalone: true, selector: "ngx-country-select", inputs: { defaultIso2: "defaultIso2", disabled: "disabled", placeholder: "placeholder" }, outputs: { countryChange: "countryChange" }, host: { listeners: { "document:click": "onDocumentClick($event)", "keydown.escape": "onEscape()" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => CountrySelectComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<div class=\"ngx-ccp\" [class.ngx-ccp--disabled]=\"disabled\">\n  <button\n    type=\"button\"\n    class=\"ngx-ccp__trigger\"\n    [attr.aria-expanded]=\"isOpen\"\n    [disabled]=\"disabled\"\n    (click)=\"toggle()\"\n  >\n    <ng-container *ngIf=\"selected; else placeholderTpl\">\n      <span class=\"ngx-ccp__flag\">{{ selected.flag }}</span>\n      <span class=\"ngx-ccp__dial\">{{ selected.dialCode }}</span>\n    </ng-container>\n    <ng-template #placeholderTpl>\n      <span class=\"ngx-ccp__placeholder\">Select country</span>\n    </ng-template>\n    <span class=\"ngx-ccp__caret\" aria-hidden=\"true\">\u25BE</span>\n  </button>\n\n  <div class=\"ngx-ccp__panel\" *ngIf=\"isOpen\">\n    <input\n      type=\"text\"\n      class=\"ngx-ccp__search\"\n      [placeholder]=\"placeholder\"\n      [ngModel]=\"searchTerm\"\n      (ngModelChange)=\"onSearch($event)\"\n      autocomplete=\"off\"\n    />\n    <ul class=\"ngx-ccp__list\" role=\"listbox\">\n      <li\n        *ngFor=\"let country of filtered\"\n        class=\"ngx-ccp__option\"\n        [class.ngx-ccp__option--active]=\"selected?.iso2 === country.iso2\"\n        role=\"option\"\n        (click)=\"select(country)\"\n      >\n        <span class=\"ngx-ccp__flag\">{{ country.flag }}</span>\n        <span class=\"ngx-ccp__name\">{{ country.name }}</span>\n        <span class=\"ngx-ccp__dial\">{{ country.dialCode }}</span>\n      </li>\n      <li class=\"ngx-ccp__empty\" *ngIf=\"filtered.length === 0\">No matches</li>\n    </ul>\n  </div>\n</div>\n", styles: [".ngx-ccp{position:relative;display:inline-block;font-family:inherit;font-size:14px}.ngx-ccp--disabled{opacity:.5;pointer-events:none}.ngx-ccp__trigger{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border:1px solid #ccc;border-radius:6px;background:#fff;cursor:pointer;min-width:90px}.ngx-ccp__placeholder{color:#888}.ngx-ccp__caret{margin-left:auto;font-size:10px;color:#888}.ngx-ccp__panel{position:absolute;top:calc(100% + 4px);left:0;z-index:1000;width:260px;max-height:320px;display:flex;flex-direction:column;background:#fff;border:1px solid #ccc;border-radius:6px;box-shadow:0 4px 16px #0000001f;overflow:hidden}.ngx-ccp__search{padding:8px 10px;border:none;border-bottom:1px solid #eee;outline:none;font-size:14px}.ngx-ccp__list{list-style:none;margin:0;padding:4px 0;overflow-y:auto}.ngx-ccp__option{display:flex;align-items:center;gap:8px;padding:6px 10px;cursor:pointer}.ngx-ccp__option:hover,.ngx-ccp__option--active{background:#f0f4ff}.ngx-ccp__name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ngx-ccp__dial{color:#666}.ngx-ccp__empty{padding:10px;color:#888;text-align:center}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: CountrySelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-country-select', standalone: true, imports: [CommonModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => CountrySelectComponent),
                            multi: true,
                        },
                    ], host: {
                        '(document:click)': 'onDocumentClick($event)',
                    }, template: "<div class=\"ngx-ccp\" [class.ngx-ccp--disabled]=\"disabled\">\n  <button\n    type=\"button\"\n    class=\"ngx-ccp__trigger\"\n    [attr.aria-expanded]=\"isOpen\"\n    [disabled]=\"disabled\"\n    (click)=\"toggle()\"\n  >\n    <ng-container *ngIf=\"selected; else placeholderTpl\">\n      <span class=\"ngx-ccp__flag\">{{ selected.flag }}</span>\n      <span class=\"ngx-ccp__dial\">{{ selected.dialCode }}</span>\n    </ng-container>\n    <ng-template #placeholderTpl>\n      <span class=\"ngx-ccp__placeholder\">Select country</span>\n    </ng-template>\n    <span class=\"ngx-ccp__caret\" aria-hidden=\"true\">\u25BE</span>\n  </button>\n\n  <div class=\"ngx-ccp__panel\" *ngIf=\"isOpen\">\n    <input\n      type=\"text\"\n      class=\"ngx-ccp__search\"\n      [placeholder]=\"placeholder\"\n      [ngModel]=\"searchTerm\"\n      (ngModelChange)=\"onSearch($event)\"\n      autocomplete=\"off\"\n    />\n    <ul class=\"ngx-ccp__list\" role=\"listbox\">\n      <li\n        *ngFor=\"let country of filtered\"\n        class=\"ngx-ccp__option\"\n        [class.ngx-ccp__option--active]=\"selected?.iso2 === country.iso2\"\n        role=\"option\"\n        (click)=\"select(country)\"\n      >\n        <span class=\"ngx-ccp__flag\">{{ country.flag }}</span>\n        <span class=\"ngx-ccp__name\">{{ country.name }}</span>\n        <span class=\"ngx-ccp__dial\">{{ country.dialCode }}</span>\n      </li>\n      <li class=\"ngx-ccp__empty\" *ngIf=\"filtered.length === 0\">No matches</li>\n    </ul>\n  </div>\n</div>\n", styles: [".ngx-ccp{position:relative;display:inline-block;font-family:inherit;font-size:14px}.ngx-ccp--disabled{opacity:.5;pointer-events:none}.ngx-ccp__trigger{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border:1px solid #ccc;border-radius:6px;background:#fff;cursor:pointer;min-width:90px}.ngx-ccp__placeholder{color:#888}.ngx-ccp__caret{margin-left:auto;font-size:10px;color:#888}.ngx-ccp__panel{position:absolute;top:calc(100% + 4px);left:0;z-index:1000;width:260px;max-height:320px;display:flex;flex-direction:column;background:#fff;border:1px solid #ccc;border-radius:6px;box-shadow:0 4px 16px #0000001f;overflow:hidden}.ngx-ccp__search{padding:8px 10px;border:none;border-bottom:1px solid #eee;outline:none;font-size:14px}.ngx-ccp__list{list-style:none;margin:0;padding:4px 0;overflow-y:auto}.ngx-ccp__option{display:flex;align-items:center;gap:8px;padding:6px 10px;cursor:pointer}.ngx-ccp__option:hover,.ngx-ccp__option--active{background:#f0f4ff}.ngx-ccp__name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ngx-ccp__dial{color:#666}.ngx-ccp__empty{padding:10px;color:#888;text-align:center}\n"] }]
        }], ctorParameters: () => [{ type: CountryCodeService }, { type: i0.ElementRef }], propDecorators: { defaultIso2: [{
                type: Input
            }], disabled: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], countryChange: [{
                type: Output
            }], onEscape: [{
                type: HostListener,
                args: ['keydown.escape']
            }] } });

/**
 * Validates that a control's value (digits only) has a length within
 * the given country's minLength/maxLength range.
 *
 * Usage: mobileLengthValidator(() => this.selectedCountry)
 */
function mobileLengthValidator(getCountry) {
    return (control) => {
        const country = getCountry();
        const value = control.value;
        if (!country || value == null || value === '') {
            return null;
        }
        const digits = String(value).replace(/\D/g, '');
        if (digits.length < country.minLength || digits.length > country.maxLength) {
            return {
                mobileLength: {
                    minLength: country.minLength,
                    maxLength: country.maxLength,
                    actualLength: digits.length,
                },
            };
        }
        return null;
    };
}

/*
 * Public API Surface of ngx-country-code-picker
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CountryCodeService, CountrySelectComponent, mobileLengthValidator };
//# sourceMappingURL=an-country-code-selector.mjs.map



export class CommonUtils {
  static getCountries() {
    return [
      'Afghanistan',
      'Albania',
      'Algeria',
      'Andorra',
      'Angola',
      'Antigua & Deps',
      'Argentina',
      'Armenia',
      'Australia',
      'Austria',
      'Azerbaijan',
      'Bahamas',
      'Bahrain',
      'Bangladesh',
      'Barbados',
      'Belgium',
      'Belize',
      'Benin',
      'Bhutan',
      'Bolivia',
      'Bosnia Herzegovina',
      'Botswana',
      'Brazil',
      'Brunei',
      'Bulgaria',
      'Burkina',
      'Cambodia',
      'Cameroon',
      'Canada',
      'Cape Verde',
      'Chad',
      'Chile',
      'China',
      'Colombia',
      'Comoros',
      'Congo',
      'Costa Rica',
      'Croatia',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Djibouti',
      'Dominica',
      'Dominican Republic',
      'East Timor',
      'Ecuador',
      'Egypt',
      'El Salvador',
      'Equatorial Guinea',
      'Eritrea',
      'Estonia',
      'Ethiopia',
      'Fiji',
      'Finland',
      'France',
      'Gabon',
      'Gambia',
      'Georgia',
      'Germany',
      'Ghana',
      'Greece',
      'Grenada',
      'Guatemala',
      'Guinea',
      'Guinea-Bissau',
      'Guyana',
      'Haiti',
      'Honduras',
      'Hungary',
      'Iceland',
      'India',
      'Indonesia',
      'Ireland {Republic}',
      'Israel',
      'Italy',
      'Ivory Coast',
      'Jamaica',
      'Japan',
      'Jordan',
      'Kazakhstan',
      'Kenya',
      'Kiribati',
      'Korea South',
      'Kosovo',
      'Kuwait',
      'Kyrgyzstan',
      'Laos',
      'Latvia',
      'Lesotho',
      'Liberia',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Macedonia',
      'Madagascar',
      'Malawi',
      'Malaysia',
      'Maldives',
      'Mali',
      'Malta',
      'Marshall Islands',
      'Mauritania',
      'Mauritius',
      'Mexico',
      'Micronesia',
      'Moldova',
      'Monaco',
      'Mongolia',
      'Montenegro',
      'Morocco',
      'Mozambique',
      'Myanmar, {Burma}',
      'Namibia',
      'Nauru',
      'Nepal',
      'Netherlands',
      'New Zealand',
      'Niger',
      'Nigeria',
      'Norway',
      'Oman',
      'Pakistan',
      'Palau',
      'Panama',
      'Papua New Guinea',
      'Paraguay',
      'Peru',
      'Philippines',
      'Poland',
      'Portugal',
      'Qatar',
      'Romania',
      'Russian Federation',
      'Rwanda',
      'St Kitts & Nevis',
      'St Lucia',
      'Saint Vincent & the Grenadines',
      'Samoa',
      'San Marino',
      'Sao Tome & Principe',
      'Saudi Arabia',
      'Senegal',
      'Serbia',
      'Seychelles',
      'Sierra Leone',
      'Singapore',
      'Slovakia',
      'Slovenia',
      'Solomon Islands',
      'South Africa',
      'South Sudan',
      'Spain',
      'Sri Lanka',
      'Suriname',
      'Swaziland',
      'Sweden',
      'Switzerland',
      'Taiwan',
      'Tajikistan',
      'Tanzania',
      'Thailand',
      'Togo',
      'Tonga',
      'Trinidad & Tobago',
      'Tunisia',
      'Turkey',
      'Turkmenistan',
      'Tuvalu',
      'Uganda',
      'Ukraine',
      'United Arab Emirates',
      'United Kingdom',
      'United States',
      'Uruguay',
      'Uzbekistan',
      'Vanuatu',
      'Vatican City',
      'Vietnam',
      'Zambia'
    ];
  }

  static getCategories() {
    return [
      'Mobile and Computer',
      'Electronic Appliances',
      'Home Appliances',
      'Men Clothing',
      'Women Clothing',
      'Kids Clothing',
      'Toys',
      'Vehicles',
      'Books',
      'Movies',
      'Music and Videos',
      'Others'
    ];
  }

  static getRandomId() {
    const random = 'qweryuiopasdfghjklzbnm1234567890';
    let id = '';
    for (let i = 0; i < 10; i++) {
      id += random.charAt(Math.floor(Math.random() * random.length));
    }
    return id;
  }

  static getRoutePath(name: string): string {
    let path = '';
    const arr = name.toLowerCase().split(' ');
    arr.forEach((text, index) => {
      path += text;
      if (index !== arr.length - 1) {
        path += '-';
      }
    });
    return path;
  }
}

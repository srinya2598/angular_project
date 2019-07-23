import { IProductCategory } from '../models/category';
import { IMessage } from '@ec-shared/models/message';
import { MessageType } from '@ec-shared/utils/constants';

export class CommonUtils {
  static imagesExtensions = ['jpeg', 'jpg', 'gif', 'png', 'bmp', 'svg'];

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

  /**
   * Ideally, the parameter type any should be replaced by typeof T but the compiler (TS 2.4) can't understand this syntax.
   * @param enumRef Enum Type
   * @returns T[] Array of cases in enum
   */

  static getEnumKeys<T>(enumRef: any): T[] {
    return Object.keys(enumRef).map(key => enumRef[key]);
  }

  static getProductCategoryTitle(category: IProductCategory) {
    let title;
    switch (category) {
      case IProductCategory.MOBILE_COMPUTER:
        title = 'Mobile and Computers';
        break;
      case IProductCategory.ELECTRONIC_APPLIANCES:
        title = 'Electronic appliances';
        break;
      case IProductCategory.HOME_APPLIANCES:
        title = 'Home appliances';
        break;
      case IProductCategory.MEN_CLOTHING:
        title = 'Men clothing';
        break;
      case IProductCategory.WOMEN_CLOTHING:
        title = 'Women clothing';
        break;
      case IProductCategory.KIDS_CLOTHING:
        title = 'Kids clothing';
        break;
      case IProductCategory.TOYS:
        title = 'Toys';
        break;
      case IProductCategory.VEHICLES:
        title = 'Vehicles';
        break;
      case IProductCategory.BOOKS:
        title = 'Books';
        break;
      case IProductCategory.MOVIES_MUSIC_VIDEOS:
        title = 'Movies, music and videos';
        break;
      default:
        title = 'Others';
        break;
    }
    return title;

  }

  static getRandomId() {
    const random = 'qweryuiopasdfghjklzbnm1234567890';
    let id = '';
    for (let i = 0; i < 10; i++) {
      id += random.charAt(Math.floor(Math.random() * random.length));
    }
    return id;
  }

  static isImage(fileType: string): boolean {
    const type = fileType.substr(fileType.indexOf('/') + 1);
    return this.imagesExtensions.indexOf(type.toLowerCase()) !== -1;
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

  static isOnMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  }

  static mapMessages(messages: IMessage[]) {
    let mappedMessages = [];
    const sEmailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    messages.forEach((message) => {
      let sMessage: IMessage = {
        id: message.id,
        roomId: message.roomId,
        text: message.text,
        sender: message.sender,
        receiver: message.receiver,
        type: message.type,
        timestamp: message.timestamp,
        isFav: message.isFav
      };
      if (message.type === MessageType.IMAGE) {
        sMessage = {
          ...sMessage,
          image: {
            image_url: message.image.image_url,
            caption: message.image.caption
          }
        };
      }
      if (sEmailRegex.test(message.text)) {
        console.log('Matched');
        sMessage.text = message.text.toString().replace(sEmailRegex, '<a href="mailto:$&">$&</a>').toString();
      }
      mappedMessages.push(sMessage);
    });
    mappedMessages = mappedMessages.sort((message_one: IMessage, message_two: IMessage) => {
      return message_one.timestamp - message_two.timestamp;
    });

    return mappedMessages;
  }
}

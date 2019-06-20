// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  dbPassword:"ecommerce",
  production: false,
  firebase: {
    apiKey: 'AIzaSyDgRsAD0-UwlShuWj_dvduQ4SjcurPHSt4',
    authDomain: 'ecommerce-70288.firebaseapp.com',
    databaseURL: 'https://ecommerce-70288.firebaseio.com',
    projectId: 'ecommerce-70288',
    storageBucket: 'ecommerce-70288.appspot.com',
    messagingSenderId: '345051771690'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

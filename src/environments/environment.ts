// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  firebaseConfig : {
    apiKey: "AIzaSyDfudya9LVkSZFBBpHjhHJchAsQ7mKt0BI",
    authDomain: "reject-final-blog.firebaseapp.com",
    databaseURL: "https://reject-final-blog-default-rtdb.firebaseio.com",
    projectId: "reject-final-blog",
    storageBucket: "reject-final-blog.appspot.com",
    messagingSenderId: "381919384738",
    appId: "1:381919384738:web:2a05ecb759c44c47a2f3fb",
    measurementId: "G-S8BSWJJ9K0"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

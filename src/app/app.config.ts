import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';


const firebaseConfig = {
  apiKey: "AIzaSyBALSY5WRp-fgQUAXawjzvFcd7ZGpqMPGc",
  authDomain: "zomato-e10ee.firebaseapp.com",
  projectId: "zomato-e10ee",
  storageBucket: "zomato-e10ee.appspot.com",
  messagingSenderId: "73423423729",
  appId: "1:73423423729:web:85c4aa0549c974c8c30150"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      // provideFirebaseapp(() => initializeapp(firebaseConfig)),
      // provideAuth(() => getAuth())
    ]),
  ],
};

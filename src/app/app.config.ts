import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { firebaseConfig } from './core/constants/constants';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom([
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, 
    AngularFirestoreModule
    ]),     
  ],
};

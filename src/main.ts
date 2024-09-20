import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({"projectId":"chat-app-8d4b8","appId":"1:397182516340:web:5c08c34cef25e70d2d6521","storageBucket":"chat-app-8d4b8.appspot.com","apiKey":"AIzaSyBr4onE6PxU_1CtWeFjjoWsVGvcAXMpUFc","authDomain":"chat-app-8d4b8.firebaseapp.com","messagingSenderId":"397182516340"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
});

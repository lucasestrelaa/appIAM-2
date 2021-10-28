import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
//import { environments } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RecaptchaModule } from 'ng-recaptcha';
import { ChartsModule } from 'ng2-charts';
import * as firebase from 'firebase';
import { Network } from '@ionic-native/network/ngx';
import { Push, PushOptions } from '@ionic-native/push/ngx';

firebase.initializeApp(environment.firebase);



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    //AngularFireModule.initializeApp(environments.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    
    //ChartsModule, está dando erro!!!!
    //RecaptchaModule.forRoot(),
    
  ],  
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Keyboard,
    Network,
    Push,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

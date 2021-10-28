import { CanActivate } from '@angular/router';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './services/user.service';
import { User } from './interfaces/user';
import { Subscription } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Push, PushOptions, PushObject } from '@ionic-native/push/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;
  //private usuarios: User = {};
  private Iduser: string;
  private phoneNumber: string;
  private userSubscription: Subscription;

  private userId: string;
  public user: User = {};
  public usuarios: User = {};
  //private usuarios: User = {};
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private userService: UserService,
    private push: Push,
  ) {
    this.getUser();
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeFirebase();
    });
  }
  private initializeFirebase(){
    const options: PushOptions = {
      android: {
        senderID: '302271829397'
      }
    }
    const pushObject: PushObject = this.push.init(options)

    pushObject.on('registration').subscribe(res => console.log(' ${res.registrationID}'))

    pushObject.on('notification').subscribe(res => console.log('Já chegou o disco voador: ${res.message}'))
  }
  logout(){
    this.authService.logout();
    
  }
  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Perfil",
        url   : "/perfil",
        icon  : "person-outline",
        
      },
      {
        title : "Página Inicial",
        url   : "/home",
        icon  : "home-outline"
      },
      {
        title : "Enquete",
        url   : "/enquete-semanal",
        icon  : "clipboard-outline"
      },
      {
        title : "Criar Enquete ",
        url   : "/cenquete",
        icon  : "create-outline"
      },
      {
        title : "Enquete (parcial)",
        url   : "/res-enquete",
        icon  : "create-outline"
      },
      {
        title : "Enquete Finalizada",
        url   : "/enquete-finalizada",
        icon  : "checkmark-circle-outline"
      },
      {
        title : "Sorteios",
        url   : "/sorteio",
        icon  : "ribbon-outline"
      },
      {
        title : "Resultados dos sorteios",
        url   : "/res-sorteios",
        icon  : "ribbon-outline"
      },
      {
        title : "Administração",
        url   : "/adm",
        icon  : "build-outline"
      },
      {
        title : "Relatórios",
        url   : "/relatorios",
        icon  : "analytics-outline"
      },
      /*{
        title : "Sair",
        url   : "",
        icon  : "person-add",

      },*/
    ]
  }
  async getUser() {
    this.phoneNumber = (await this.authService.getAuth().currentUser).phoneNumber;
    //this.user.phoneNumber =  (await this.authService.getAuth().currentUser).phoneNumber;
    this.userId = (await this.authService.getAuth().currentUser).uid;
    //console.log("1")
    this.userSubscription = this.userService.getUsuarios().subscribe(data => {
      for (let x = 0; x < data.length; x++) {
        if (data[x].id == this.userId) {
          this.user = data[x];
          this.usuarios = data[x];
          this.Iduser = data[x].id;
          //console.log(this.usuarios.profissao+ " " + this.usuarios.id)
        } else {
          this.usuarios.phoneNumber = this.phoneNumber;
          console.log(this.usuarios.phoneNumber + this.usuarios.id + "13")
        }
      }
    });
  }
}

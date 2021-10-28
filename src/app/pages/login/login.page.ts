import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { User } from 'src/app/interfaces/user';
import { LoadingController, ToastController, NavController, IonSlides } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { PhoneNumberService } from 'src/app/services/phone-number.service';
firebase.auth().languageCode = 'pt';
export class PhoneNumber{
  contry: string = '55';
  area: string;
  number: string;
  get el64(){
    const num = '+'+this.contry + this.area + this.number;
    return num;
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides:IonSlides;
  windowRef: any;
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user:any;

  verificationId: any;
  code = '';
  showCodeInput = false;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;
  private captchaPassed: boolean = false;
  private captchaResponse: string;

  constructor(
    public navCtrl: NavController,
    private win: PhoneNumberService,
    
    public keyboard: Keyboard,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private zone: NgZone,
  ) { 
    
  }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'normal',
      callback: response => {
      },
      'expired-callback': () => {
      }
  });
    this.windowRef.recaptchaVerifier.render();
  }
  captchaResolved(response: string): void {
    this.zone.run(() => {
        this.captchaPassed = true;
        this.captchaResponse = response;
    });
  }
  sendLoginCode(){
    const  appVerifier = this.windowRef.recaptchaVerifier;
    console.log('yes')
    const num = this.phoneNumber.el64;
    console.log(num)
    firebase.auth().signInWithPhoneNumber(num, appVerifier).then(result => {
      this.windowRef.confirmationResult = result;
      console.log('enviado!')
      this.segmentChanged();
    }).catch( error => console.log(error));
  }
  verificationLoginCode(){
    this.windowRef.confirmationResult.confirm(this.verificationCode).then( result => {
      this.user = result.user;
    }).catch(error => console.log(error, 'incorrect code entered?'))
  }
  sendForm(): void {
      let data = {
          captchaResponse: this.captchaResponse
      };      
  }
  async login() {
    await this.presentLoading();
    try {
      await this.authService.login(this.userLogin);
    }catch (error) {
      console.error(error);
      this.presentToast(error.message);
    }finally{
      this.loading.dismiss();
    }
  }
  async register() {
    await this.presentLoading();
    try {
      await this.authService.register(this.userRegister);
    } catch (error) {
      let message: string;
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'E-mail já utilizado';
          break;
        case 'auth/invalid-email':
          message = 'E-mail invalido';
          break;
      }
      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor aguarde!' });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
  segmentChanged(){
    this.slides.slideNext();
  }
}

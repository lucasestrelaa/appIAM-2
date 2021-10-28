import { PhoneNumberService } from 'src/app/services/phone-number.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { RA } from 'src/app/interfaces/ra';
import { Profissao } from 'src/app/interfaces/profissao';
import { AdmRAService } from 'src/app/services/adm-ra.service';
import { AdmProfissaoService } from 'src/app/services/adm-profissao.service';
import { UserService } from 'src/app/services/user.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public user: User = {};
  public ras = new Array<RA>();
  private RASubscription: Subscription;

  public profissoes = new Array<Profissao>();
  private profissaoSubscription: Subscription;
  private userSubscription: Subscription;
  private loading: any;
  private userId: any;
  public usuarios: User = {};
  //private usuarios: User = {};
  private Iduser: string;
  private phoneNumber: string;
  constructor(
    private authService: AuthService, 
    private phoneService: PhoneNumberService,
    private raService: AdmRAService,
    private profissaoService: AdmProfissaoService,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) { 
    this.getUser();
    

    this.RASubscription = this.raService.getRAs().subscribe(data => {
      this.ras = data;
    });
    this.profissaoSubscription = this.profissaoService.getProfissoes().subscribe(data => {
      this.profissoes = data;
      
    });
    
    
  }

  ngOnInit() {
    
  }
  ngOnDestroy(){
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
  
  async salvarUsuario(){

    await this.presentLoading();
    //this.user.id = (await this.authService.getAuth().currentUser).uid;
    //console.log((await this.authService.getAuth().currentUser).email);
    console.log(this.usuarios.id+" asnfogunasfognaosignosmgasdg")
    if(this.usuarios.id) {
      console.log(this.usuarios + " 1234");
        console.log(this.Iduser + " 1234")
      try{
        console.log(this.usuarios);
        console.log(this.Iduser);
        //usuarios
        // 1 = Adm || 2 = criador de enquetes || 3 = usuario simples
        if(!this.usuarios.tipoUser){
          setTimeout(await this.loading.dismiss(), 3000);
          if(!this.usuarios.tipoUser){
            this.usuarios.tipoUser = 3;
          }
        }else{

        }
        
        await this.userService.updateUsuario(this.usuarios.id, this.usuarios);
        await this.loading.dismiss();
        this.presentToast('Usuário salvo!');
        this.navCtrl.navigateBack('/home');
      }catch (error){
        console.log(error)
        this.presentToast('Erro ao tentar salvar1!');
        this.loading.dismiss();
      }
    }else{
      //this.user.data = new Date().getTime();
      
      try{
        this.usuarios.tipoUser = 3;
        this.usuarios.id = (await this.authService.getAuth().currentUser).uid;
        await this.userService.addUsuario(this.usuarios.id , this.usuarios);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      }catch (error){
        this.presentToast('Erro ao tentar salvar!');
        this.loading.dismiss();
      }
    }

  }

  async getUser(){
    this.phoneNumber = (await this.authService.getAuth().currentUser).phoneNumber;
    //this.user.phoneNumber =  (await this.authService.getAuth().currentUser).phoneNumber;
    this.userId =  (await this.authService.getAuth().currentUser).uid;
    //console.log("1")
    this.userSubscription = this.userService.getUsuarios().subscribe(data => {
      for(let x = 0; x < data.length; x++){
        if(data[x].id == this.userId){
          this.user = data[x];
          this.usuarios = data[x];
          this.Iduser = data[x].id;
          //console.log(this.usuarios.profissao+ " " + this.usuarios.id)
        }else{
          this.usuarios.phoneNumber = this.phoneNumber;
          //this.usuarios.id = this.userId;
          //console.log(this.usuarios.phoneNumber + this.usuarios.id + "13")
        }
      }
    });
    //if (this.userId) this.loadUsuario();
  }
  /*loadUsuario(){
    this.userSubscription = this.userService.getUsuario(this.userId).subscribe(data => {
      console.log("2")
      this.usuarios = data;
      this.Iduser = this.user.id;
      console.log(this.Iduser);
      //console.log(this.user);
    });
  }*/

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor aguarde!' });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}

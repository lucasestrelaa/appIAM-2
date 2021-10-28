import { Component, OnInit } from '@angular/core';
import { Sorteio } from 'src/app/interfaces/sorteio';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Cupom } from 'src/app/interfaces/cupom';
import { CuponsService } from 'src/app/services/cupons.service';
import { User } from '../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { SorteioService } from 'src/app/services/sorteio.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-sorteio',
  templateUrl: './sorteio.page.html',
  styleUrls: ['./sorteio.page.scss'],
})
export class SorteioPage implements OnInit {
  private loading: any;

  public sorteio: Sorteio = {};
  public maximo: number;
  public minimo: number;
  public somaSorteio: number;

  private userId: string;
  private idCupom: any;
  public qntCupons: any;
  public qntCuponsUser: number = 0;
  public cupons = new Array<Cupom>();
  public cupom: Cupom = {};
  private cuponsSubscription: Subscription;

  public user: User = {};
  public usuarios: User = {};
  //private usuarios: User = {};
  private Iduser: string;
  //private phoneNumber: string;
  private userSubscription: Subscription;
  constructor(
    private cuponsService: CuponsService,
    private authService: AuthService,
    private userService: UserService,
    private sorteioService: SorteioService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) { 
    this.cuponsSubscription = this.cuponsService.getCupons().subscribe(data => {
          this.cupons = data;
          this.qntCupons = this.cupons.length;
    });
    
    
  }

  ngOnInit() {
  }

  async sortear(){
    //alert(this.cupons.length);
    
    this.sorteio.userId = (await this.authService.getAuth().currentUser).uid;
    //this.minimo = this.sorteio.minimo;
    //this.maximo = this.sorteio.maximo;
    this.somaSorteio = Math.floor(Math.random() * this.qntCupons + 1);

    this.cupom = this.cupons[this.somaSorteio];
    //alert(this.cupom.userId);
    this.sorteio.userId = this.cupom.userId;
    //alert(this.sorteio.userId);
    this.getUser();
    //this.sorteio.nomeGanhador = this.usuarios.nome;
    //this.sorteio.userId = this.usuarios.id;
    //alert(this.sorteio.nomeGanhador);
    this.salvarSorteio();
    //console.log(this.minimo + " "+ this.maximo + " " + this.sorteio.userId);
  }
  getUser(){
    this.userSubscription = this.userService.getUsuario(this.sorteio.userId).subscribe(data => {
      this.usuarios = data;
      this.sorteio.nomeGanhador = this.usuarios.nome;
      //alert(this.usuarios.nome);
    //this.cupons.qntCupons = this.cupons.qntCupons;
    });
  }
  async salvarSorteio(){

    await this.presentLoading();
    //this.user.id = (await this.authService.getAuth().currentUser).uid;
    //console.log((await this.authService.getAuth().currentUser).email);
    //console.log(this.usuarios.id+" asnfogunasfognaosignosmgasdg")
   
      /*  console.log(this.usuarios + " 1234");
        console.log(this.Iduser + " 1234")
      try{
        console.log(this.usuarios);
        console.log(this.Iduser);
        //usuarios
        // 1 = Adm || 2 = criador de enquetes || 3 = usuario simples
        this.usuarios.tipoUser = 3;
        await this.userService.updateUsuario(this.usuarios.id, this.usuarios);
        await this.loading.dismiss();
        this.presentToast('Usuário salvo!');
        this.navCtrl.navigateBack('/home');
      }catch (error){
        console.log(error)
        this.presentToast('Erro ao tentar salvar1!');
        this.loading.dismiss();
      }*/
    
      //this.user.data = new Date().getTime();
      this.sorteio.data = new Date();
      //this.sorteio.nomeGanhador = this.usuarios.nome;
      try{
        await this.sorteioService.addSorteio(this.sorteio);
        await this.loading.dismiss();
        alert("sorteio realizado e o ganhador foi: " + this.sorteio.nomeGanhador);
        this.navCtrl.navigateBack('/res-sorteios');
      }catch (error){
        console.log(error);
        this.presentToast('Erro ao tentar salvar!');
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

}


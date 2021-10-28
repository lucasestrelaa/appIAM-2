import { Enquete } from './../../interfaces/enquete';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../interfaces/user';
import { Cupom } from 'src/app/interfaces/cupom';
import { Subscription } from 'rxjs';
import { CuponsService } from 'src/app/services/cupons.service';
import { UserService } from 'src/app/services/user.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { EnqueteService } from 'src/app/services/enquete.service';
import { ContVotoService } from 'src/app/services/cont-voto.service';
import { ContVoto } from 'src/app/interfaces/cont-voto';
import { Voto } from 'src/app/interfaces/voto';
import { VotoService } from 'src/app/services/voto.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  private conectado = true;
  public cupons: Cupom = {};
  private cuponsSubscription: Subscription;

  private userId: string;
  private idCupom: any;
  private cupom: any;
  public qntCupons: any;
  public qntCuponsUser: number = 0;

  public user: User = {};
  public usuarios: User = {};
  //private usuarios: User = {};
  private Iduser: string;
  private phoneNumber: string;
  private userSubscription: Subscription;

  //enquete
  //private enqueteId: string = null;
  public idEnquete: string;
  public enquete: Enquete = {};
  public enquetes = new Array<Enquete>();
  //public enquetes: Enquete = {};
  public enquetesArray = new Array<Enquete>();
  private enquetesSubscription: Subscription;
  
  //qntVotos
  private contVotoId: string = null;
  private idContVoto: string = null;
  public contVoto: ContVoto = {};
  private contVotosSubscription: Subscription;

  //voto
  private votoId: string = null;
  private idVoto: string = null;
  public voto: Voto = {};
  private votoSubscription: Subscription;
  
  //datas
  date: any;
  month: any;
  year: any;
  day: any;
  datFinal;
  labelEnquete;
  private currentDate: Date;
  constructor(
    public actionSheetController: ActionSheetController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private cuponsService: CuponsService,
    private userService: UserService,
    private enquetesService: EnqueteService,
    private contVotoService: ContVotoService,
    private votosService: VotoService,
    private navCtrl: NavController,
    private network: Network,
  ) {
    //this.load();
    this.conexao();
    this.getUser();
    //if (this.votoId) this.loadVoto();
    this.date = new Date();
    this.formatDate(this.date);
    this.currentDate = this.date;
    //alert(this.currentDate);
    
    
    this.cuponsSubscription = this.cuponsService.getCupons().subscribe(data => {
      for (var x = 0; x < data.length; x++) {
        //console.log(data[x].vigente);
        //console.log(data[x].idEnquete);
        if (data[x].userId == this.userId) {
          this.cupons = data[x];
          this.idCupom = data[x].id;
          this.qntCuponsUser++;
          //console.log(this.qntCuponsUser);
        }
      }
    });
    
    this.enquetesSubscription = this.enquetesService.getEnquetes().subscribe(data => {
      this.enquetes = data;
      for (var x = 0; x < this.enquetes.length; x++) {
        //array 0 - Ano / 1 Mês / 2 - dia
        let stringI = this.enquetes[x].dataInicio.toString();
        let arrI = stringI.split("-", 3);
        console.log(arrI);
        let stringF = this.enquetes[x].dataFinal.toString();
        let arrF = stringF.split("-", 3);
        console.log(arrF);
        let stringD = this.currentDate.toString();
        let arrD = stringD.split("-", 3);
        //alert(arrD);
        console.log(arrI[0] + " , " + arrD[0] + " , " + arrF[0] + " , " + arrD[0])
        if (arrI[0] == arrD[0] && arrF[0] == arrD[0]) {
          console.log("1 "+arrI[0] + "-" + arrD[0] + "-" + arrF[0]);
          alert(arrI[1] + "-" + arrF[1] + "-" + arrD[1]);
          if (arrI[1] <= arrD[1] &&   arrF[1]  >= arrD[1] ) {
            alert("quanto ao mês")
            if(arrI[1] == arrF[1] && arrF[1] <= arrD[1]){
              alert("Mês permanece o mesmo "+arrI[2] +"-" + arrD[2] + "-" + arrF[2])
              if (arrI[2] <= arrD[2] && arrF[2] >= arrD[2]) {
                console.log(arrI[2] + "-" + arrD[2] + "-" + arrF[2] + "zzzzzzzzzzzzzzz");
                this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                console.log(this.datFinal);
                this.enquete = this.enquetes[x];
                this.idEnquete = data[x].id;
                console.log(this.enquete.titulo)
              }
              //alert(parseInt(arrI[1]))
            }else if(arrI[1] != arrF[1] && arrF[1] >= arrD[1]){
              alert("Mudou o mês")
              //alert("Mês diferente"+arrI[2] +"-" + arrD[2] + "-" + arrF[2])
              var mes;
              
              let stringI = this.enquetes[x].dataInicio.toString();
              let arrI = stringI.split("-", 3);
              //var qntDias = new Date(ano, parseInt(arrI[1]), 0).getMonth();  
              console.log(qntDias)
              console.log(parseInt(arrI[1]))
              var qntDias;
              switch (parseInt(arrI[1])-1) {
                case 0:
                  //alert("janeiro");
                  qntDias = 31;
                  break;
                case 1:
                  //alert("fevereiro");
                  var ano;
                  if(new Date(ano, 1, 29).getMonth() == 1){
                    //alert("ano bissexto");
                    qntDias = 29;
                  }else{
                    //alert("ano não bissexto")
                    qntDias = 28;
                  }
                  break;
                case 2:
                  //alert("março");
                  qntDias = 31;
                  break;
                case 3:
                  //alert("abril");
                  qntDias = 30;
                  break;
                case 4:
                  //alert("maio");
                  qntDias = 31;
                  break;
                case 5:
                  //alert("junho");
                  qntDias = 30;
                  break;
                case 6:
                 //alert("julho");
                  qntDias = 31;
                  break;
                case 7:
                  //alert("agosto");
                  qntDias = 31;
                  break;
                case 8:
                  //alert("setembro");
                  qntDias = 30;
                  break;
                case 9:
                  //alert("outubro");
                  qntDias = 31;
                  break;
                case 10:
                  //alert("novembro");
                  qntDias = 30;
                  break;
                case 11:
                  //alert("dezembro");
                  qntDias = 31;
                  break;
                default:
                  break;
              }
              if(qntDias <= "28"){
                
                if (arrF[2] >= arrD[2]) {
                  console.log(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
                  this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                  //alert(this.datFinal);
                  this.enquete = this.enquetes[x];
                  this.idEnquete = data[x].id;
                  alert(this.enquete.titulo)
                }
              }
              if(qntDias <= "29"){
                
                if (arrF[2] >= arrD[2]) {
                  console.log(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
                  this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                  //alert(this.datFinal);
                  this.enquete = this.enquetes[x];
                  this.idEnquete = data[x].id;
                  console.log(this.enquete.titulo)
                }
              }
              if(qntDias <= "30"){
                
                if (arrF[2] >= arrD[2]) {
                  //alert(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
                  this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                  console.log(this.datFinal);
                  this.enquete = this.enquetes[x];
                  this.idEnquete = data[x].id;
                  console.log(this.enquete.titulo)
                }
              }
              if(qntDias <= "31"){
                
                if (arrF[2] >= arrD[2]) {
                  //alert(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
                  this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                  console.log(this.datFinal);
                  this.enquete = this.enquetes[x];
                  this.idEnquete = data[x].id;
                  console.log(this.enquete.titulo)
                }
              }
            
            }
            //alert(arrI[1] + "-" + arrF[1] + "-" + arrD[1] + "--" + arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
            
          }
        }
        
      }
    });
    //conferir se tem enquetes
    

    this.votoSubscription = this.votosService.getVotos().subscribe(data => {
      
        for (var x = 0; x < data.length; x++) {
          //console.log(data[x].vigente);
          //alert(data[x].enqueteId +" - "+ this.idEnquete)
          if (this.idEnquete) {
            //console.log(data[x]);
            //alert("1 nível"+data[x].enqueteId +" - "+ this.idEnquete);
            if(data[x].enqueteId == this.idEnquete){
              //alert(data[x].enqueteId +" - "+ this.idEnquete)
              if(data[x].userId == this.userId){
                (document.getElementById("enquete") as HTMLInputElement).disabled = false;
                //alert("2 nível"+ data[x].userId +" - "+this.userId)
                this.voto = data[x];
                this.idVoto = data[x].id;
                //alert(this.idVoto);
                document.getElementById("enquete").style.backgroundColor = "rgb(0,255,0,0.8)";
                this.labelEnquete = "Enquete respondida, Finaliza: "+ this.datFinal;
                //alert(this.enquete.titulo)
                //console.log(this.idEnquete);
                break;
              }else{
                (document.getElementById("enquete") as HTMLInputElement).disabled = false;
                document.getElementById("enquete").style.backgroundColor = "rgb(255,0,0,0.8)";
                this.labelEnquete = "enquete ainda não respondida, prazo até: " +this.datFinal;
  
              }
            }else{
              (document.getElementById("enquete") as HTMLInputElement).disabled = false;
              document.getElementById("enquete").style.backgroundColor = "rgb(255,0,0,0.8)";
              this.labelEnquete = "enquete ainda não respondida, prazo até: " +this.datFinal;
            }
          }else if(!this.idEnquete){
            (document.getElementById("enquete") as HTMLInputElement).disabled = true;
            this.labelEnquete = "Não há enquete disponível";
            //document.getElementById("enquete").style.backgroundColor = "rgb(255,0,0,2.0)";
            //alert(this.idEnquete+" - "+data[x].enqueteId +" - "+ "não tem enquete disponível");
            //alert("");
          }
        }
      
      if(data.length == 0 && !this.idEnquete){
        //alert("data vazia");
        (document.getElementById("enquete") as HTMLInputElement).disabled = true;
          document.getElementById("enquete").style.backgroundColor = "rgb(255,0,0,0.8)";
          this.labelEnquete = "Não há enquete disponível e não há voto!";
      }
      
    }, error => {
      console.log(error)
  });
    
    
  }
  ngOnInit() {
    //conexao();
  }
  log() {
    return this.user.email;
  }
async conexao(){
  let disconnectSubscription = await this.network.onDisconnect().subscribe(() => {
    this.conectado = false;
    alert('Se conecte à internet!');
  });
  disconnectSubscription.unsubscribe();
  let connectSubscription = await this.network.onConnect().subscribe(() => {
    console.log('network connected!');
    // We just got a connection but we need to wait briefly
     // before we determine the connection type. Might need to wait.
    // prior to doing any api requests as well.
    setTimeout(() => {
      if (this.network.type === 'wifi') {
        console.log('we got a wifi connection, woohoo!');
      }
    }, 300);
  });
  
  // stop connect watch
  connectSubscription.unsubscribe();
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
          //console.log(this.usuarios.phoneNumber + this.usuarios.id + "13")
        }
      }
      if(this.conectado){
        
        if(!this.Iduser){
          this.conexao();
          alert("Faça o seu login");
          this.navCtrl.navigateBack('/perfil');
        }
      }
      
    });
  }
  async getCupons() {
    console.log(this.idCupom);
    this.cuponsSubscription = this.cuponsService.getCupom(this.idCupom).subscribe(data => {
      this.cupom = data;
      //this.cupons.qntCupons = this.cupons.qntCupons;
    });
  }
  async loadVoto(){

    //var recUserId = (await this.authService.getAuth().currentUser).uid;
    //var recEnqueteId = (await this.idEnquete);

    //console.log("Aquei estão os valores");
    //if(this.voto.userId == recUserId && this.voto.userId == recEnqueteId){
    //  this.votoSubscription = this.votosService.getVoto(this.votoId).subscribe(data => {
    //    this.voto = data;
    //    console.log(this.voto);



    //  });
    //}

  }
  logout(){
    this.authService.logout();
    
  }
  load() {
    location.reload()
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.load();
    setTimeout(() => {
      console.log('Async operation has ended');
      
      event.target.complete();
    }, 2000);
  }

  async formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    this.date = [year, month, day].join('-');
    //console.log(this.date);
    //return [year, month, day].join('-');
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor aguarde!' });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Logout',
        icon: 'log-out-outline',
        handler: () => {
          this.logout();
          console.log('Share clicked');
        }
      },{
        text: 'Perfil',
        icon: 'person-outline',
        handler: () => {
          this.navCtrl.navigateRoot('/perfil');
          console.log('/perfil');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}

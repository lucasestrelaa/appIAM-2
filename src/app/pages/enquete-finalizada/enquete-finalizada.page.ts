import { Component, OnInit } from '@angular/core';
import { Enquete } from 'src/app/interfaces/enquete';
import { Subscription } from 'rxjs';
import { EnqueteService } from 'src/app/services/enquete.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-enquete-finalizada',
  templateUrl: './enquete-finalizada.page.html',
  styleUrls: ['./enquete-finalizada.page.scss'],
})
export class EnqueteFinalizadaPage implements OnInit {
  public enquetes = new Array<Enquete>();
  public enquete = {};
  private enquetesSubscription: Subscription;
  public idEnquete: string;
  private loading: any;

  public usuarios: User = {};
  private userId: string;
  public user: User = {};
  //private usuarios: User = {};
  private Iduser: string;
  private phoneNumber: string;
  private userSubscription: Subscription;

  date: any;
  month: any;
  year: any;
  day: any;
  datFinal;
  labelEnquete;
  private currentDate: Date;
  constructor(
    private enquetesService: EnqueteService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private userService: UserService,
    private authService: AuthService,
  ) {

    this.getUser();
    this.date = new Date();
    this.formatDate(this.date);
    this.currentDate = this.date;

    this.enquetesSubscription = this.enquetesService.getEnquetes().subscribe(data => {
      this.enquetes = data;
      for (var x = 0; x < this.enquetes.length; x++) {
        //array 0 - Ano / 1 Mês / 2 - dia
        let stringI = this.enquetes[x].dataInicio.toString();
        let arrI = stringI.split("-", 3);
        //alert(arrI);
        let stringF = this.enquetes[x].dataFinal.toString();
        let arrF = stringF.split("-", 3);
        //alert(arrF);
        let stringD = this.currentDate.toString();
        let arrD = stringD.split("-", 3);
        //alert(arrD);
        //alert(arrI[0] + " , " + arrD[0] + " , " + arrF[0] + " , " + arrD[0])
        if (arrI[0] == arrD[0] && arrF[0] == arrD[0]) {
          //alert("1 "+arrI[0] + "-" + arrD[0] + "-" + arrF[0]);
          //alert(arrI[1] + "-" + arrF[1] + "-" + arrD[1]);
          if (arrI[1] <= arrD[1] &&   arrF[1]  >= arrD[1] ) {
            //Conferir se o mês é muda
            if(arrI[1] == arrF[1] && arrF[1] <= arrD[1]){
              //alert("Mês permanece o mesmo"+arrI[2] +"-" + arrD[2] + "-" + arrF[2])
              if (arrI[2] <= arrD[2] && arrF[2] >= arrD[2]) {
                //alert(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
                this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                //alert(this.datFinal);
                //if(!this.enquetes[x].vigente){
                  this.enquete = this.enquetes[x];
                  this.idEnquete = data[x].id;
                  alert(Object.keys(this.enquete).length)
                //}
                
                //alert(this.enquete.titulo)
              }
              //alert(parseInt(arrI[1]))
            }else if(arrI[1] != arrF[1] && arrF[1] >= arrD[1]){
              //Mudou o mês
              //alert("Mês diferente"+arrI[2] +"-" + arrD[2] + "-" + arrF[2])
              var mes;
              
              let stringI = this.enquetes[x].dataInicio.toString();
              let arrI = stringI.split("-", 3);
              //var qntDias = new Date(ano, parseInt(arrI[1]), 0).getMonth();  
              //alert(qntDias)
              //alert(parseInt(arrI[1]))
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
                  //alert(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
                  this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                  //alert(this.datFinal);
                  this.enquete = this.enquetes[x];
                  this.idEnquete = data[x].id;
                  alert(Object.keys(this.enquete).length)
                  //alert(this.enquete.titulo)
                }
              }
              if(qntDias <= "29"){
                
                if (arrF[2] >= arrD[2]) {
                  //alert(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
                  this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                  //alert(this.datFinal);
                  this.enquete = this.enquetes[x];
                  this.idEnquete = data[x].id;
                  alert(Object.keys(this.enquete).length)
                  //alert(this.enquete.titulo)
                }
              }
              if(qntDias <= "30"){
                
                if (arrF[2] >= arrD[2]) {
                  //alert(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
                  this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                  //alert(this.datFinal);
                  this.enquete = this.enquetes[x];
                  this.idEnquete = data[x].id;
                  alert(Object.keys(this.enquete).length)
                  //alert(this.enquete.titulo)
                }
              }
              if(qntDias <= "31"){
                
                if (arrF[2] >= arrD[2]) {
                  //alert(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
                  this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                  //alert(this.datFinal);
                  this.enquete = this.enquetes[x];
                  this.idEnquete = data[x].id;
                  alert(Object.keys(this.enquete).length)
                  Object.keys(this.enquete).pop;
                  //alert(this.enquete.titulo)
                }
              }
            
            }
            //alert(arrI[1] + "-" + arrF[1] + "-" + arrD[1] + "--" + arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
            
          }
        }
        
      } console.log(this.enquete)
    });
   }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.enquetesSubscription.unsubscribe();
  }

  async getUser() {
    //this.phoneNumber = (await this.authService.getAuth().currentUser).phoneNumber;
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

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}

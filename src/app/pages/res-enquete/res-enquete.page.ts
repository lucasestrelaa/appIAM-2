import { Component, OnInit } from '@angular/core';
import { Enquete } from 'src/app/interfaces/enquete';
import { Subscription } from 'rxjs';
import { EnqueteService } from 'src/app/services/enquete.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { VotoService } from 'src/app/services/voto.service';
import { Voto } from 'src/app/interfaces/voto';
import { ContVoto } from 'src/app/interfaces/cont-voto';
import { ContVotoService } from 'src/app/services/cont-voto.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-res-enquete',
  templateUrl: './res-enquete.page.html',
  styleUrls: ['./res-enquete.page.scss'],
})
export class ResEnquetePage implements OnInit {
  //enquetes
  public enquetes = new Array<Enquete>();
  public enquete: Enquete = {};
  private enqueteId: string = null;
  public idEnquete: string;
  private enquetesSubscription: Subscription;
  //votos
  public voto: Voto = {};
  private idVoto: string = null;
  private contVotosSubscription: Subscription;
  //qntVotos
  private contVotoId: string = null;
  private idContVoto: string = null;
  public contVoto: ContVoto = {};
  
  private loading: any;
  
  private votoSubscription: Subscription;
  public v1Flot: number = 0.0;
  public v2Flot: number = 0.0;
  public v3Flot: number = 0.0;
  public v4Flot: number = 0.0;
  public v5Flot: number = 0.0;

  private idUser: string;
  
  public usuarios: User = {};
  private userId: string;
  public user: User = {};
  //private usuarios: User = {};
  private Iduser: string;
  private phoneNumber: string;
  private userSubscription: Subscription;
  //datas
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
    private votosService: VotoService,
    private contVotoService: ContVotoService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,

    
  ) { 
    this.getUser();
    //if (this.votoId) this.loadVoto();
    this.date = new Date();
    this.formatDate(this.date);
    this.currentDate = this.date;
    this.enqueteId = this.activateRoute.snapshot.params['id'];
    if(!this.enqueteId){
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
          if (arrI[0] == arrD[0] && arrF[0] == arrD[0]) {
            //alert(arrI[0] + "-" + arrD[0] + "-" + arrF[0]);
            if (arrI[1] == arrD[1] &&   arrD[1] == arrF[1] ) {
              //alert(arrI[1] + "-" + arrF[1] + "-" + arrD[1] + "--" + arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
              //alert(arrI[2] +"-" + arrD[2] + "-" + arrF[2])
              if (arrI[2] <= arrD[2] && arrF[2] >= arrD[2]) {
                //alert(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
                this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                //alert(this.datFinal);
                this.enquete = this.enquetes[x];
                this.idEnquete = data[x].id;
                //alert(this.enquete.titulo)
              }
            }
          }
        }
      });
    }else{
      this.loadEnquete();
    }
    
      
      this.votoSubscription = this.votosService.getVotos().subscribe(data => {
        for(var x = 0; x < data.length; x++){
          //console.log(data[x].vigente);
          if(data[x].enqueteId == this.idEnquete || data[x].enqueteId == this.enqueteId){
            //console.log(data[x]);
            this.voto = data[x];
            this.idVoto = data[x].id;
            
            //console.log(this.idEnquete);
          }
        }
        
      });
      this.contVotosSubscription = this.contVotoService.getContVotos().subscribe(data => {
        for(var x = 0; x < data.length; x++){
          //console.log(data[x].vigente);
          //console.log(data[x].idEnquete);
          if(data[x].idEnquete == this.idEnquete || data[x].idEnquete == this.enqueteId){
            
            this.contVoto = data[x];
            this.idContVoto = data[x].id;
            //console.log(this.idContVoto + " tdfujzsdglofgbasfglbsafgi")
            this.v1Flot += this.contVoto.votosA;
            this.v2Flot += this.contVoto.votosB;
            this.v3Flot += this.contVoto.votosC;
            this.v4Flot += this.contVoto.votosD;
            this.v5Flot += this.contVoto.votosE;
            
            //return this.enquete;
            //console.log(this.idEnquete);
          }
        }
        this.v1Flot = this.v1Flot/10;
        this.v2Flot = this.v2Flot/10;
        this.v3Flot = this.v3Flot/10;
        this.v4Flot = this.v4Flot/10;
        this.v5Flot = this.v5Flot/10;
        
        //console.log("hasdhashdasd " + this.v1Flot);
        
      });  
  }
  ngOnInit() {
    
  }
  ngOnDestroy(){
    if (this.votoSubscription) this.votoSubscription.unsubscribe();
    if (this.enquetesSubscription) this.enquetesSubscription.unsubscribe();
    //if (this.cuponsSubscription) this.cuponsSubscription.unsubscribe();
    if (this.contVotosSubscription) this.contVotosSubscription.unsubscribe();
  }
  loadEnquete(){
    if(this.enqueteId){
      this.enquetesSubscription = this.enquetesService.getEnquete(this.enqueteId).subscribe(data => {
        this.enquete = data;
      });
    }
    
  }

  loadContVotos(){
    this.contVotosSubscription = this.contVotoService.getContVoto(this.idContVoto).subscribe(data => {
      this.contVoto = data;
      //this.contVoto.votosA = this.contVoto.votosA/100;
      //console.log(" abcde "+this.contVoto.votosA)
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
          //console.log(this.usuarios.phoneNumber + this.usuarios.id + "10")
        }
      }
    });
  }
  
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  
  

}

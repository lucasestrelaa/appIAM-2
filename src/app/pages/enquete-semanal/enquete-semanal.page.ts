
import { Component, OnInit } from '@angular/core';
import { Enquete } from 'src/app/interfaces/enquete';
import { Voto } from 'src/app/interfaces/voto';
import { EnqueteService } from 'src/app/services/enquete.service';
import { VotoService } from 'src/app/services/voto.service';
import { CuponsService } from 'src/app/services/cupons.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Cupom } from 'src/app/interfaces/cupom';
import { ContVotoService } from 'src/app/services/cont-voto.service';
import { ContVoto } from 'src/app/interfaces/cont-voto';
import { ContVotoRaService } from 'src/app/services/cont-voto-ra.service';
import { AdmProfissaoService } from 'src/app/services/adm-profissao.service';
import { AdmRAService } from 'src/app/services/adm-ra.service';
import { RA } from 'src/app/interfaces/ra';
import { Profissao } from 'src/app/interfaces/profissao';
import { ContVotoRa } from 'src/app/interfaces/cont-voto-ra';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ContVotoProfissaoService } from 'src/app/services/cont-voto-profissao.service';
import { ContVotoProfissao } from 'src/app/interfaces/cont-voto-profissao';


@Component({
  selector: 'app-enquete-semanal',
  templateUrl: './enquete-semanal.page.html',
  styleUrls: ['./enquete-semanal.page.scss'],
})
export class EnqueteSemanalPage implements OnInit {
  private disable: boolean;
  private loading: any;
  //voto
  private votoId: string = null;
  private idVoto: string = null;
  public voto: Voto = {};
  private votoSubscription: Subscription;
  //enquete
  //private enqueteId: string = null;
  public idEnquete: string;
  public enquete: Enquete = {};
  public enquetes = new Array<Enquete>();
  //public enquetes: Enquete = {};
  public enquetesArray = new Array<Enquete>();
  private enquetesSubscription: Subscription;
  //cupom
  private cupomId: string = null;
  private idCupom: string = null;
  public cupom: Cupom = {};
  private cuponsSubscription: Subscription;
  //qntVotos
  private contVotoId: string = null;
  private idContVoto: string = null;
  public contVoto: ContVoto = {};
  private contVotosSubscription: Subscription;
  //qntVotosRA
  private contVotoRaId: string = null;
  private idContVotoRa: string = null;
  public contVotoRa: ContVotoRa = {};
  private contVotosRaSubscription: Subscription;
  //Ra
  private raId: string = null;
  private idRa: string = null;
  public ra: RA = {};
  private raSubscription: Subscription;
  //qntVotosProfissao
  private contVotoProfissaoId: string = null;
  private idContVotoProfissao: string = null;
  public contVotoProfissao: ContVotoProfissao = {};
  private contVotosProfissaoSubscription: Subscription;
  //Profissao
  private profissaoId: string = null;
  private idProfissao: string = null;
  public profissao: Profissao = {};
  private profissaoSubscription: Subscription;
  

  private idUser: string;
  date: any;
  month: any;
  year: any;
  day: any;
  datFinal;
  private currentDate: Date;
  //private fb: any;
  public usuarios: User = {};
  private userId: string;
  public user: User = {};
  //private usuarios: User = {};
  private Iduser: string;
  private RaUser: string;
  private ProfissaoUser: string;
  private NomeRaUser: string;
  private NomeProfissaoUser: string;
  private phoneNumber: string;
  private userSubscription: Subscription;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private votosService: VotoService,
    private enquetesService: EnqueteService,
    private cuponsService: CuponsService,
    private contVotoService: ContVotoService,
    private contVotoRaService: ContVotoRaService,
    private contVotoProfissaoService: ContVotoProfissaoService,
    private AdmRaService: AdmRAService,
    private AdmProfissaoService: AdmProfissaoService,
    private navCtrl: NavController,
    private userService: UserService,
  ) {
    this.votoId = this.activateRoute.snapshot.params['id'];

    this.getUser();
    if (this.votoId) this.loadVoto();
    this.date = new Date();
    this.formatDate(this.date);
    this.currentDate = this.date;
    console.log(this.currentDate);
    //this.enquetesSubscription = this.enquetesService.getEnquetes().subscribe(data => {
    //  this.enquetes = data;
    //Enquetes
    this.enquetesSubscription = this.enquetesService.getEnquetes().subscribe(data => {
      this.enquetes = data;
      //console.log("123456789876543456789");
      for (var x = 0; x < this.enquetes.length; x++) {
        //console.log(data[x].vigente);
        //var myBool: boolean = data.vigente;
        //var myString: string = String(myBool);
        //console.log(myString)
        //alert(myString);
        //const vigente: string = bool.toString(data[x].vigente);
        //console.log(vigente + "6r28y4j534");
        //Comparar strings ou boolean
        //this.enquete = this.enquetes[x];
        //alert(this.currentDate);
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
                this.enquete = this.enquetes[x];
                this.idEnquete = data[x].id;
                //alert(this.enquete.titulo)
              }
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
                  alert(this.enquete.titulo)
                }
              }
              if(qntDias <= "29"){
                
                if (arrF[2] >= arrD[2]) {
                  //alert(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
                  this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                  //alert(this.datFinal);
                  this.enquete = this.enquetes[x];
                  this.idEnquete = data[x].id;
                  alert(this.enquete.titulo)
                }
              }
              if(qntDias <= "30"){
                
                if (arrF[2] >= arrD[2]) {
                  //alert(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
                  this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                  //alert(this.datFinal);
                  this.enquete = this.enquetes[x];
                  this.idEnquete = data[x].id;
                  alert(this.enquete.titulo)
                }
              }
              if(qntDias <= "31"){
                
                if (arrF[2] >= arrD[2]) {
                  //alert(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
                  this.datFinal = arrF[2]+"/"+arrF[1]+"/"+arrF[0] ;
                  //alert(this.datFinal);
                  this.enquete = this.enquetes[x];
                  this.idEnquete = data[x].id;
                  //alert(this.enquete.titulo)
                }
              }
            
            }
            //alert(arrI[1] + "-" + arrF[1] + "-" + arrD[1] + "--" + arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
            
          }
        }//this.enquete = this.enquetes[x];
              //this.idEnquete = data[x].id;
        //alert(this.enquetes[x].dataInicio.getUTCDate);
        //console.log(this.enquetes[x].dataInicio + " " + this.currentDate + " " + this.enquetes[x].dataFinal)
        /*if(this.enquetes[x].dataInicio.getDay > this.currentDate.getDay && this.enquetes[x].dataFinal.getDay < this.currentDate.getDay){
           //console.log("1");
           console.log("1234567890")
           this.enquete = this.enquetes[x];
          }else{
            //console.log("2");
          }*/
         // console.log(vigente);
      
        //console.log();
        //if(myString === "true"){
         // console.log(data[x].vigente);
          //this.enquete = data[x];
          
          //console.log(this.enquete);
        //}
      }
      //this.enquetes.
      //var myBool: boolean = data;
        //var myString: string = String(myBool);
      
    });
    /*this.enquetesSubscription = this.enquetesService.getEnquetes().subscribe(data => {
      for(var x = 0; x < data.length; x++){
        //console.log(data[x].vigente);
        var myBool: boolean = data[x].vigente;
        var myString: string = String(myBool);
        //alert(myString);
        //const vigente: string = bool.toString(data[x].vigente);
        //console.log(vigente + "6r28y4j534");
        //Comparar strings ou boolean
        if(myString === 'true'){
           //console.log("1");
          }else{
            //console.log("2");
          }
         // console.log(vigente);
      
        //console.log();
        //if(myString === "true"){
         // console.log(data[x].vigente);
          this.enquetes = data[x];
          this.idEnquete = data[x].id;
          //console.log(this.enquete);
        //}
      }
      
    });*/
    //alert(this.userId)
        this.votoSubscription = this.votosService.getVotos().subscribe(data => {
          for (var x = 0; x < data.length; x++) {
            //console.log(data[x].vigente);
            if (data[x].enqueteId == this.idEnquete && data[x].userId == this.userId) {
              //console.log(data[x]);
              this.voto = data[x];
              this.idVoto = data[x].id;
              //console.log(this.idEnquete);
            }
          }

        });
        this.cuponsSubscription = this.cuponsService.getCupons().subscribe(data => {
          for (var x = 0; x < data.length; x++) {
            //console.log(data[x].vigente);
            this.getUsuario();
            //console.log("Este é o usuário:" + this.idUser);
            if (data[x].userId != this.idUser) {
              //console.log(data[x].userId);
              this.cupom = data[x];
              this.idCupom = data[x].id;
              //return this.enquete;
              //console.log(this.idEnquete);
            }
          }

        });
        this.contVotosSubscription = this.contVotoService.getContVotos().subscribe(data => {
          for (var x = 0; x < data.length; x++) {
            //console.log(data[x].vigente);
            if (data[x].idEnquete == this.idEnquete) {
              //console.log(data);
              this.contVoto = data[x];
              this.idContVoto = data[x].id;
              //return this.enquete;
              //console.log(this.idEnquete);
            }
          }

        });
        this.contVotosRaSubscription = this.contVotoRaService.getContVotosRa().subscribe(data => {
          for (var x = 0; x < data.length; x++) {
            //console.log(data[x].vigente);
            if (data[x].idEnquete == this.idEnquete) {
              //console.log(data);
              this.contVotoRa = data[x];
              this.idContVotoRa = data[x].idRa;
              //return this.enquete;
              //console.log(this.idEnquete);
              /**
               * Observar, pois quando atualiza a página, perde o id enquete, com isso, ele cria um novo idContVotoRA
               * 
               * 
               * 
               */
            }
          }

        });
        this.contVotosProfissaoSubscription = this.contVotoProfissaoService.getContVotosProfissao().subscribe(data => {
          for (var x = 0; x < data.length; x++) {
            //console.log(data[x].vigente);
            if (data[x].idEnquete == this.idEnquete) {
              //console.log(data);
              this.contVotoProfissao = data[x];
              this.idContVotoProfissao = data[x].idProfissao;
              //return this.enquete;
              //console.log(this.idEnquete);
              /**
               * Observar, pois quando atualiza a página, perde o id enquete, com isso, ele cria um novo idContVotoRA
               * 
               * 
               * 
               */
            }
          }

        });
      }

      ngOnInit() {
        //this.getUser();
      }
      ngOnDestroy(){
        if (this.votoSubscription) this.votoSubscription.unsubscribe();
        if (this.enquetesSubscription) this.enquetesSubscription.unsubscribe();
        if (this.cuponsSubscription) this.cuponsSubscription.unsubscribe();
        if (this.contVotosSubscription) this.contVotosSubscription.unsubscribe();
      }

      async salvarVoto(){
        await this.presentLoading();

        if (this.voto.enqueteId == this.idEnquete && this.voto.userId == (await this.authService.getAuth().currentUser).uid) {
          this.presentToast('Você já votou');
          //await this.loading.dismiss();
          //this.navCtrl.navigateRoot('/res-enquete');
        } else {
          this.voto.userId = (await this.authService.getAuth().currentUser).uid;
          this.voto.enqueteId = (await this.idEnquete);
          await this.votosService.addVoto(this.voto);

          //console.log((await this.authService.getAuth().currentUser).uid, this.idEnquete);
          //voto

          //cupons
          //if(this.idCupom == null || this.cupom.userId != (await this.authService.getAuth().currentUser).uid){
          this.cupom.qntCupons = 1;
          this.cupom.userId = (await this.authService.getAuth().currentUser).uid;
          await this.cuponsService.addCupom(this.cupom);


          //}else{
          //  this.cupom.qntCupons += 1;
          //  console.log(typeof(this.cupom.qntCupons) + " - " +this.cupom.id);
          //   await this.cuponsService.updateCupom(this.cupom.id, this.cupom);
          //  console.log("Este cupom é o " + this.cupom);
          //  console.log(typeof(this.cupom.qntCupons));
          //await this.loading.dismiss();
          // }
          //contVoto
          //alert(this.voto.voto);
          //contVoto
          if (this.idContVoto == null) {
            this.contVoto.votosA = 0;
            this.contVoto.votosB = 0;
            this.contVoto.votosC = 0;
            this.contVoto.votosD = 0;
            this.contVoto.votosE = 0;
            switch (this.voto.voto) {
              case "1":
                const val1 = 1;
                this.contVoto.votosA = 1;
                break;
              case "2":
                const val2 = 1;
                this.contVoto.votosB = 1;
                break;
              case "3":
                const val3 = 1;
                this.contVoto.votosC = 1;
                break;
              case "4":
                const val4 = 1;
                this.contVoto.votosD = 1;
                break;
              case "5":
                const val5 = 1;
                this.contVoto.votosE = 1;
                break;
              default:
                break;
            }
            //this.contVoto.votosA = 1;
            //this.contVoto.idEnquete = (await this.idEnquete);
            this.contVoto.idEnquete = (await this.idEnquete);
            await this.contVotoService.addContVoto(this.contVoto);
            //console.log(this.contVoto);
            this.cupom.qntCupons += 1;
            //await this.loading.dismiss();
          } else {
            switch (this.voto.voto) {
              case "1":
                //const val1 = 1;
                this.contVoto.votosA++;
                break;
              case "2":
                //const val2 = 1;
                this.contVoto.votosB++;
                break;
              case "3":
                //const val3 = 1;
                this.contVoto.votosC++;
                break;
              case "4":
                //const val4 = 1;
                this.contVoto.votosD++;
                break;
              case "5":
                //const val5 = 1;
                this.contVoto.votosE++;
                break;
              default:
                break;
            }
            //this.contVoto.votosA = 1;
            this.contVoto.idEnquete = (await this.idEnquete);
            await this.contVotoService.updateContVoto(this.contVoto.id, this.contVoto);
            //console.log(this.contVoto);
            //await this.loading.dismiss();

          }
          //contVotoRa
          if (this.idContVotoRa == null || this.idContVotoRa != this.RaUser) {
           //console.log("1");
            this.contVotoRa.idRa = this.RaUser;
            this.contVotoRa.nomeRa = this.NomeRaUser;
            this.contVotoRa.votosA = 0;
            this.contVotoRa.votosB = 0;
            this.contVotoRa.votosC = 0;
            this.contVotoRa.votosD = 0;
            this.contVotoRa.votosE = 0;
            switch (this.voto.voto) {
              case "1":
                const val1 = 1;
                this.contVotoRa.votosA = 1;
                break;
              case "2":
                const val2 = 1;
                this.contVotoRa.votosB = 1;
                break;
              case "3":
                const val3 = 1;
                this.contVotoRa.votosC = 1;
                break;
              case "4":
                const val4 = 1;
                this.contVotoRa.votosD = 1;
                break;
              case "5":
                const val5 = 1;
                this.contVotoRa.votosE = 1;
                break;
              default:
                break;
            }
            //this.contVoto.votosA = 1;
            //this.contVoto.idEnquete = (await this.idEnquete);
            this.contVotoRa.idEnquete = (await this.idEnquete);
            await this.contVotoRaService.addContVotoRa(this.contVotoRa);
            //console.log(this.contVotoRa);
            //this.cupom.qntCupons += 1;
            //await this.loading.dismiss();
          } else if(this.contVotoRa.idRa == this.RaUser) {
            //console.log("2");
            switch (this.voto.voto) {
              case "1":
                //const val1 = 1;
                this.contVotoRa.votosA++;
                break;
              case "2":
                //const val2 = 1;
                this.contVotoRa.votosB++;
                break;
              case "3":
                //const val3 = 1;
                this.contVotoRa.votosC++;
                break;
              case "4":
                //const val4 = 1;
                this.contVotoRa.votosD++;
                break;
              case "5":
                //const val5 = 1;
                this.contVotoRa.votosE++;
                break;
              default:
                break;
            }
            //this.contVoto.votosA = 1;
            this.contVotoRa.idEnquete = (await this.idEnquete);
            await this.contVotoRaService.updateContVotoRa(this.contVotoRa.id, this.contVotoRa);
            //console.log(this.contVotoRa);
            //await this.loading.dismiss();
            
          }
          //contVotoProfissão
          if (this.idContVotoProfissao == null || this.idContVotoProfissao != this.ProfissaoUser) {
            //console.log("1");
            this.contVotoProfissao.idProfissao = this.ProfissaoUser;
            this.contVotoProfissao.nomeProfissao = this.NomeProfissaoUser;
            this.contVotoProfissao.votosA = 0;
            this.contVotoProfissao.votosB = 0;
            this.contVotoProfissao.votosC = 0;
            this.contVotoProfissao.votosD = 0;
            this.contVotoProfissao.votosE = 0;
            switch (this.voto.voto) {
              case "1":
                const val1 = 1;
                this.contVotoProfissao.votosA = 1;
                break;
              case "2":
                const val2 = 1;
                this.contVotoProfissao.votosB = 1;
                break;
              case "3":
                const val3 = 1;
                this.contVotoProfissao.votosC = 1;
                break;
              case "4":
                const val4 = 1;
                this.contVotoProfissao.votosD = 1;
                break;
              case "5":
                const val5 = 1;
                this.contVotoProfissao.votosE = 1;
                break;
              default:
                break;
            }
            //this.contVoto.votosA = 1;
            //this.contVoto.idEnquete = (await this.idEnquete);
            this.contVotoProfissao.idEnquete = (await this.idEnquete);
            await this.contVotoProfissaoService.addContVotoProfissao(this.contVotoProfissao);
            //console.log(this.contVotoProfissao);
            //this.cupom.qntCupons += 1;
            //await this.loading.dismiss();
          } else if(this.contVotoProfissao.idProfissao == this.NomeProfissaoUser) {
            //console.log("2");
            switch (this.voto.voto) {
              case "1":
                //const val1 = 1;
                this.contVotoProfissao.votosA++;
                break;
              case "2":
                //const val2 = 1;
                this.contVotoProfissao.votosB++;
                break;
              case "3":
                //const val3 = 1;
                this.contVotoProfissao.votosC++;
                break;
              case "4":
                //const val4 = 1;
                this.contVotoProfissao.votosD++;
                break;
              case "5":
                //const val5 = 1;
                this.contVotoProfissao.votosE++;
                break;
              default:
                break;
            }
            //this.contVoto.votosA = 1;
            this.contVotoProfissao.idEnquete = (await this.idEnquete);
            await this.contVotoProfissaoService.updateContVotoProfissao(this.contVotoProfissao.id, this.contVotoProfissao);
            //console.log(this.contVotoProfissao);
            //await this.loading.dismiss();
            
          }

        }
        await this.loading.dismiss();
        //this.navCtrl.navigateRoot('/res-enquete', { this.idEnquete });
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
              this.RaUser = data[x].RA;
              this.ProfissaoUser = data[x].profissao;
              this.raSubscription = this.AdmRaService.getRAs().subscribe(data => {
                for (let x = 0; x < data.length; x++) {
                  if (data[x].id == this.RaUser) {
                    this.NomeRaUser = data[x].abreviacao;
                    //console.log(this.usuarios.profissao+ " " + this.usuarios.id)
                  } else {
                    
                  }
                }
              });
              this.profissaoSubscription = this.AdmProfissaoService.getProfissoes().subscribe(data => {
                for (let x = 0; x < data.length; x++) {
                  if (data[x].id == this.ProfissaoUser) {
                    this.NomeProfissaoUser = data[x].abreviacao;
                    //alert("Usuario"+this.usuarios.profissao+ " " + this.usuarios.id)
                  } else {
                    
                  }
                }
              });
              //console.log(this.usuarios.profissao+ " " + this.usuarios.id)
            } else {
              this.usuarios.phoneNumber = this.phoneNumber;
              //console.log(this.usuarios.phoneNumber + this.usuarios.id + "13")
            }
          }
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

      //async loadEnquete(){
      //  this.enquetesSubscription = this.enquetesService.getEnquete(this.idEnquete).subscribe(data => {
      //    this.enquete = data;
      //  });
      //}

      async getUsuario(){
        this.idUser = (await this.authService.getAuth().currentUser).uid;
      }
      load() {
        location.reload();
      }
      doRefresh(event) {
        //console.log('Begin async operation');
        this.load();
        setTimeout(() => {
          //console.log('Async operation has ended');
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
    }

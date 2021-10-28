
import { ContVotoProfissao } from './../../interfaces/cont-voto-profissao';

import { Component, OnInit } from '@angular/core';
import 'chart.js';
import { Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Subscription } from 'rxjs';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { Enquete } from 'src/app/interfaces/enquete';
import { Voto } from 'src/app/interfaces/voto';
import { User } from './../../interfaces/user';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { EnqueteService } from 'src/app/services/enquete.service';
import { VotoService } from 'src/app/services/voto.service';
import { CuponsService } from 'src/app/services/cupons.service';
import { ContVotoService } from 'src/app/services/cont-voto.service';
import { ContVoto } from 'src/app/interfaces/cont-voto';
import { RA } from 'src/app/interfaces/ra';
//import { ContVotoRa } from 'src/app/interfaces/cont-voto-ra';
import { Profissao } from 'src/app/interfaces/profissao';
import { AdmRAService } from 'src/app/services/adm-ra.service';
import { ContVotoRaService } from 'src/app/services/cont-voto-ra.service';
import { ContVotoProfissaoService } from 'src/app/services/cont-voto-profissao.service';
import { AdmProfissaoService } from 'src/app/services/adm-profissao.service';
import { ContVotoRa } from 'src/app/interfaces/cont-voto-ra';
import { __values } from 'tslib';


@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
  // directives: [BaseChartDirective]
})
export class RelatoriosPage implements OnInit {
  //total
  public totalG1 = 0;
  public totalG2 = 0;
  public totalG3 = 0;
  //enquete
  public idEnquete: string;
  public enquetes = new Array<Enquete>();
  public enquete: Enquete = {};
  private enquetesSubscription: Subscription;
  //efeitos da página
  private loading: any;
  //contVoto
  public idContVoto: string;
  public idContVotoEnquete: string;
  public idContVotoEnqueteRA: string;
  public idContVotoEnqueteProfissao: string;
  public contVotos = new Array<ContVoto>();
  public contVoto: ContVoto = {};
  private contVotosSubscription: Subscription;
  public votos = new Array<Voto>();
  private votoId: string = null;
  private id: string;
  private idVoto: string = null;
  public voto: Voto = {};
  private votoSubscription: Subscription;
  //Ra
  public idContVotoRa: string;
  public contVotoRA: ContVotoRa = {};
  public idContVotoRaEnquete: string;
  public contVotoRas = new Array<ContVotoRa>();
  public ras = new Array<RA>();
  public rasTotal = new Array<ContVotoRa>();
  public ra: RA = {};
  public raTotal: RA = {};
  public RaName = {};
  public RaUsuario = '';
  public abreviacaoRa: string;
  private contVotoRasSubscription: Subscription;
  private contVotoProfissaoSubscription: Subscription;
  //profissao
  public contVotoProfissao: ContVotoRa = {};
  public contVotoProfissoes = new Array<ContVotoProfissao>();
  public contVotoRasCombo = new Array<ContVotoRa>();
  public contVotoProfissoesCombo = new Array<ContVotoProfissao>();
  public ProfissaoUsuarios: string[];
  public usuariosProfissao: {};
  public profissoesTotal = new Array<ContVotoProfissao>();
  public profissao: Profissao = {};
  public profissoes = new Array<Profissao>();
  public abreviacaoProfissao: string;
  private profissaoSubscription: Subscription;

  //usuário
  public usuariosU = new Array<User>();
  public usuarios: User = {};
  public RaUsuarios: string[];
  public usuariosRA: {};
  private userId: string;
  public user: User = {};
  private Iduser: string;
  private phoneNumber: string;
  private userSubscription: Subscription;
  //outras variaveis
  private idUser: string;
  date: any;
  month: any;
  year: any;
  day: any;
  private currentDate: Date;
  public contagem = 0;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    
    private enquetesService: EnqueteService,
    private cuponsService: CuponsService,
    private contVotoService: ContVotoService,
    private contVotoRasService: ContVotoRaService,
    private contVotoProfissoesService: ContVotoProfissaoService,
    private votoRaService: AdmRAService,
    private profissaoService: AdmProfissaoService,
    private navCtrl: NavController,
    private userService: UserService,
  ) {
    this.getUser();

    this.enquetesSubscription = this.enquetesService.getEnquetes().subscribe(data => {
      this.enquetes = data;
      // console.log("123456789876543456789");
      for (let x = 0; x < this.enquetes.length; x++) {
        // console.log(data[x].vigente);
        // var myBool: boolean = data.vigente;
        // var myString: string = String(myBool);
        // console.log(myString)
        // alert(myString);
        // const vigente: string = bool.toString(data[x].vigente);
        // console.log(vigente + "6r28y4j534");
        // Comparar strings ou boolean
        // this.enquete = this.enquetes[x];
        // alert(this.currentDate);
        const stringI = this.enquetes[x].dataInicio.toString();
        const arrI = stringI.split('-', 3);
        // alert(arrI);
        const stringF = this.enquetes[x].dataFinal.toString();
        const arrF = stringF.split('-', 3);
        // alert(arrF);
        const stringD = this.currentDate.toDateString();
        console.log(stringD)
        const arrD = stringD.split('-', 3);
        // alert(arrD);
        if (arrI[0] == arrD[0] && arrF[0] == arrD[0]) {
          // alert(arrI[0] + "-" + arrD[0] + "-" + arrF[0]);
          if (arrI[1] == arrD[1] && arrD[1] == arrF[1]) {
            // alert(arrI[1] + "-" + arrF[1] + "-" + arrD[1] + "--" + arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
            // alert(arrI[2] +"-" + arrD[2] + "-" + arrF[2])
            if (arrI[2] <= arrD[2] && arrF[2] >= arrD[2]) {
              // alert(arrI[2] + "-" + arrD[2] + "-" + arrF[2]);
              this.enquete = this.enquetes[x];
              this.idEnquete = data[x].id;
            }
          }
        }
        // alert(this.enquetes[x].dataInicio.getUTCDate);
        // console.log(this.enquetes[x].dataInicio + " " + this.currentDate + " " + this.enquetes[x].dataFinal)
        /*if(this.enquetes[x].dataInicio.getDay > this.currentDate.getDay && this.enquetes[x].dataFinal.getDay < this.currentDate.getDay){
           //console.log("1");
           console.log("1234567890")
           this.enquete = this.enquetes[x];
          }else{
            //console.log("2");
          }*/
        // console.log(vigente);

        // console.log();
        // if(myString === "true"){
        // console.log(data[x].vigente);
        // this.enquete = data[x];

        // console.log(this.enquete);
        // }
      }
      // this.enquetes.
      // var myBool: boolean = data;
      // var myString: string = String(myBool);

    });

  }

  /*public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];*/
  ngOnInit() {
    // this.showChart();
  }
  async getUser() {
    // this.phoneNumber = (await this.authService.getAuth().currentUser).phoneNumber;
    // this.user.phoneNumber =  (await this.authService.getAuth().currentUser).phoneNumber;
    this.userId = (await this.authService.getAuth().currentUser).uid;
    // console.log("1")
    this.userSubscription = this.userService.getUsuarios().subscribe(data => {
      for (let x = 0; x < data.length; x++) {
        if (data[x].id == this.userId) {
          this.user = data[x];
          this.usuarios = data[x];
          this.Iduser = data[x].id;
          // console.log(this.usuarios.profissao+ " " + this.usuarios.id)
        } else {
          this.usuarios.phoneNumber = this.phoneNumber;
          // console.log(this.usuarios.phoneNumber + this.usuarios.id + "13")
        }
      }
    });
  }
  contEnquete() {

    // alert(this.idContVotoEnquete);
    // alert("Id do select " + this.idContVotoEnquete);
    this.id = this.idContVotoEnquete;
    this.contVotoRasSubscription = this.contVotoRasService.getContVotosRa().subscribe(data => {
      this.contVotoRas = data;
     /// console.log(this.ras)
      for (let x = 0; x < data.length; x++) {
        if (this.id == data[x].idEnquete){
          this.rasTotal.push(this.ras[x]);
          //alert("ras: "+this.rasTotal);
        }
    }
    });
    this.contVotoProfissaoSubscription = this.contVotoProfissoesService.getContVotosProfissao().subscribe(data => {
      this.contVotoProfissoes = data;
     /// console.log(this.ras)
      for (let x = 0; x < data.length; x++) {
        if (this.id == data[x].idEnquete){
          this.profissoesTotal.push(this.profissoes[x]);
          //alert("profissões: "+this.profissoesTotal);
        }
        //##########chart2.clear();
    }
    });
    this.enquetesSubscription = this.enquetesService.getEnquetes().subscribe(data => {
      // alert("id data: "+ data.id)
      this.enquetes = data;
      for (let x = 0; x < this.enquetes.length; x++) {
        if (this.enquetes[x].id == this.id) {
          // alert("Deu certo!");
          this.enquete = this.enquetes[x];
        }
      }
      // Contar votos da enquete
      this.contVotosSubscription = this.contVotoService.getContVotos().subscribe(data => {
        this.contVotos = data;
        // alert("quantidade de votos" + this.contVotos.length);
        for (let x = 0; x < this.contVotos.length; x++) {
          // alert("Ids (voto e enquete)"+this.contVotos[x].idEnquete +" - "+ this.enquete.id);
          if (data[x].idEnquete == this.enquete.id) {
            this.contVoto = data[x];

            // alert(this.contVoto.votosA);

          }
        }
        this.contagem = this.contVoto.votosA + this.contVoto.votosB + this.contVoto.votosC + this.contVoto.votosD + this.contVoto.votosE;
        this.totalG1 += this.contVoto.votosA + this.contVoto.votosB + this.contVoto.votosC + this.contVoto.votosD + this.contVoto.votosE;
        console.log(this.totalG1);
        this.showChart();

      });
      // inserir dados no combobox 2 (RA)
      this.contVotoRasSubscription = this.contVotoRasService.getContVotosRa().subscribe(data => {
        this.contVotoRas = data;
        //alert()
      });
      this.contVotoRasCombo.pop();
      for (const a in this.contVotoRas) {
        if (this.contVotoRas[a].idEnquete == this.enquete.id){
          this.contVotoRasCombo.push(this.contVotoRas[a]);
          //alert("Ras: "+this.contVotoRas[a].nomeRa);
        }
      }

      // inserir dados no combobox 3 (Profissão)
      this.contVotoProfissaoSubscription = this.contVotoProfissoesService.getContVotosProfissao().subscribe(data => {
        this.contVotoProfissoes = data;
      });
      this.contVotoProfissoesCombo.pop();
      for (const a in this.contVotoProfissoes) {
        if (this.contVotoProfissoes[a].idEnquete == this.enquete.id){
          this.contVotoProfissoesCombo.push(this.contVotoProfissoes[a]);
          //alert("Profissão: "+this.contVotoProfissoes[a].nomeProfissao);
        }
      }
        // total
        // this.totalG1 =+ this.contVoto.votosA;// + this.contVoto.votosC + this.contVoto.votosD + this.contVoto.votosE;
        // alert(this.totalG1)
      // })
    }); 
    console.log('contagem de votos: '+ this.totalG1);
    




    // this.showChart3();
  }
  contEnquete2(){
    // buscar votos RA
    console.log("showChart2")
    this.id = this.idContVotoEnqueteRA;
    this.contVotoRasSubscription = this.contVotoRasService.getContVotosRa().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if(data[i].idRa == this.id && data[i].idEnquete == this.enquete.id){
          this.contVotoRA = data[i];
          //alert("contvotoA " + this.contVotoRA);
        }
        //const element = array[i];
        
      }
      this.totalG2 += this.contVotoRA.votosA + this.contVotoRA.votosB + this.contVotoRA.votosC + this.contVotoRA.votosD + this.contVotoRA.votosE;
      //alert(this.totalG2)
      this.showChart2();
    });
    
  }
  contEnquete3(){
    // buscar votos RA
    console.log("showChart3")
    this.id = this.idContVotoEnqueteProfissao;
    this.contVotoProfissaoSubscription = this.contVotoProfissoesService.getContVotosProfissao().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if(data[i].idProfissao == this.id && data[i].idEnquete == this.enquete.id){
          this.contVotoProfissao = data[i];
          //alert("contvotoA " + this.contVotoProfissao);
        }
        //const element = array[i];
        
      }
      this.totalG3 += this.contVotoProfissao.votosA + this.contVotoProfissao.votosB + this.contVotoProfissao.votosC + this.contVotoProfissao.votosD + this.contVotoProfissao.votosE;
      //alert(this.totalG2)
      this.showChart3();
    });
    
  }
  showChart() {
    //let Contagem = this.totalG1;
    let ctx = ( document.getElementById('myChart') as any).getContext('2d');
    ctx.font = '30px Arial';
    let myChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: [this.enquete.opcao1, this.enquete.opcao2, this.enquete.opcao3, this.enquete.opcao4, this.enquete.opcao5],
        datasets: [{
          label: 'quantidade de votos:',
          // label: '# of Votes',
          
          data: [this.contVoto.votosA / this.totalG1, this.contVoto.votosB / this.totalG1, this.contVoto.votosC / this.totalG1, this.contVoto.votosD / this.totalG1, this.contVoto.votosE / this.totalG1], // this.contVoto.votosA, this.contVoto.votosB, this.contVoto.votosC, this.contVoto.votosD, this.contVoto.votosE
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)'
          ],
          borderColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        layout: {
          padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        legend:{
          labels:{
            padding: 5,
          },
        },
        //label:{
          //position: 'bottom',
        //},
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 1,
            }
          }]
        }
      }
    });
    alert(this.contVoto.votosA / this.totalG1);
    this.totalG1 = 0;
  }
  showChart2() {

    //let str = this.usuariosRA;
  //  console.log("array Usuarios RA:"+str);
    let ctx2 = ( document.getElementById('myChart2') as any).getContext('2d');
    ctx2.font = '30px Arial';
    let myChart2 = new Chart(ctx2, {
      type: 'horizontalBar',
      data: {
        labels: [this.enquete.opcao1, this.enquete.opcao2, this.enquete.opcao3, this.enquete.opcao4, this.enquete.opcao5],
        datasets: [{
          // label: '# of Votes',
          data: [this.contVotoRA.votosA / this.totalG2, this.contVotoRA.votosB / this.totalG2, this.contVotoRA.votosC / this.totalG2, this.contVotoRA.votosD / this.totalG2, this.contVotoRA.votosE / this.totalG2], // this.contVoto.votosA, this.contVoto.votosB, this.contVoto.votosC, this.contVoto.votosD, this.contVoto.votosE
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)'
          ],
          borderColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        layout: {
          padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 1,
            }
          }]
        }
      }

    });
  }
  showChart3() {
    let ctx3 = ( document.getElementById('myChart3') as any).getContext('2d');
    ctx3.font = '30px Arial';
    let myChart2 = new Chart(ctx3, {
      type: 'horizontalBar',
      data: {
        labels: [this.enquete.opcao1, this.enquete.opcao2, this.enquete.opcao3, this.enquete.opcao4, this.enquete.opcao5],
        datasets: [{
          // label: '# of Votes',
          data: [this.contVotoProfissao.votosA / this.totalG3, this.contVotoProfissao.votosB / this.totalG3, this.contVotoProfissao.votosC / this.totalG3, this.contVotoProfissao.votosD / this.totalG3, this.contVotoProfissao.votosE / this.totalG3], // this.contVoto.votosA, this.contVoto.votosB, this.contVoto.votosC, this.contVoto.votosD, this.contVoto.votosE
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)'
          ],
          borderColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        layout: {
          padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 1,
            }
          }]
        }
      }

    });
  }
}

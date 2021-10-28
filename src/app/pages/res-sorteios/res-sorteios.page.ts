import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Sorteio } from 'src/app/interfaces/sorteio';
import { SorteioService } from 'src/app/services/sorteio.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-res-sorteios',
  templateUrl: './res-sorteios.page.html',
  styleUrls: ['./res-sorteios.page.scss'],
})
export class ResSorteiosPage implements OnInit {
  private idUser: string;
  date: any;
  private currentDate: Date;
  //private fb: any;
  public usuarios: User = {};
  private userId: string;
  public user: User = {};
  //private usuarios: User = {};
  private Iduser: string;
  private phoneNumber: string;
  private userSubscription: Subscription;

  public sorteios = new Array<Sorteio>();
  public sorteio = {};
  private sorteioSubscription: Subscription;
  private loading: any;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sorteioService: SorteioService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) { 
    this.getUser();
    this.sorteioSubscription = this.sorteioService.getSorteios().subscribe(data => {
      this.sorteios = data;
    });
  }

  ngOnInit() {
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

}

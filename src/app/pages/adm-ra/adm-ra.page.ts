import { Component, OnInit } from '@angular/core';
import { RA } from 'src/app/interfaces/ra';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { AdmRAService } from 'src/app/services/adm-ra.service';

@Component({
  selector: 'app-adm-ra',
  templateUrl: './adm-ra.page.html',
  styleUrls: ['./adm-ra.page.scss'],
})
export class AdmRAPage implements OnInit {
  private loading: any;
  public ra: RA = {};
  private RaId: string = null;
  private RASubscription: Subscription;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private raService: AdmRAService,
    private navCtrl: NavController,
  ) {
    this.RaId = this.activateRoute.snapshot.params['id'];

    if (this.RaId) this.loadRA();
   }

  ngOnInit() {
  }
  ngOnDestroy(){
    if (this.RASubscription) this.RASubscription.unsubscribe();
  }
  async salvarRA(){
    await this.presentLoading();

    //this.ra.id = (await this.authService.getAuth().currentUser).uid;
    console.log((await this.authService.getAuth().currentUser).email);
    if(this.RaId) {
      try{
        await this.raService.updateRA(this.RaId, this.ra);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/adm');
      }catch (error){
        this.presentToast('Erro ao tentar salvar!');
        this.loading.dismiss();
      }
    }else{
      //this.ra.data = new Date().getTime();
      
      try{
        await this.raService.addRA(this.ra);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/adm');
      }catch (error){
        this.presentToast('Erro ao tentar salvar!');
        this.loading.dismiss();
      }
    }

  }
  loadRA(){
    this.RASubscription = this.raService.getRA(this.RaId).subscribe(data => {
      this.ra = data;
    });
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

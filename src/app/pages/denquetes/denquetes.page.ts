import { Component, OnInit } from '@angular/core';
import { Enquete } from 'src/app/interfaces/enquete';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { EnqueteService } from 'src/app/services/enquete.service';

@Component({
  selector: 'app-denquetes',
  templateUrl: './denquetes.page.html',
  styleUrls: ['./denquetes.page.scss'],
})
export class DenquetesPage implements OnInit {
  private loading: any;
  public enquete: Enquete = {};
  private enqueteId: string = null;
  private enqueteSubscription: Subscription;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private enqueteService: EnqueteService,
    private navCtrl: NavController,
  ) { 
    this.enqueteId = this.activateRoute.snapshot.params['id'];

    if (this.enqueteId) this.loadEnquete();
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    if (this.enqueteSubscription) this.enqueteSubscription.unsubscribe();
  }

  async salvarEnquete(){
    await this.presentLoading();

    this.enquete.userId = (await this.authService.getAuth().currentUser).uid;
    console.log((await this.authService.getAuth().currentUser).email);
    if(this.enqueteId) {
      try{
        await this.enqueteService.updateEnquete(this.enqueteId, this.enquete);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/cenquete');
      }catch (error){
        this.presentToast('Erro ao tentar salvar!');
        this.loading.dismiss();
      }
    }else{
      //this.enquete.data = new Date().getTime();
      
      try{
        await this.enqueteService.addEnquete(this.enquete);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/cenquete');
      }catch (error){
        this.presentToast('Erro ao tentar salvar!');
        this.loading.dismiss();
      }
    }

  }

  loadEnquete(){
    this.enqueteSubscription = this.enqueteService.getEnquete(this.enqueteId).subscribe(data => {
      this.enquete = data;
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

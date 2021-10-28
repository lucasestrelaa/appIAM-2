import { Component, OnInit } from '@angular/core';
import { Enquete } from 'src/app/interfaces/enquete';
import { Subscription } from 'rxjs';
import { EnqueteService } from 'src/app/services/enquete.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cenquete',
  templateUrl: './cenquete.page.html',
  styleUrls: ['./cenquete.page.scss'],
})
export class CenquetePage implements OnInit {
  public enquetes = new Array<Enquete>();
  public enquete = {};
  private enquetesSubscription: Subscription;
  private loading: any;

  constructor(
    private enquetesService: EnqueteService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    ) {
    this.enquetesSubscription = this.enquetesService.getEnquetes().subscribe(data => {
      this.enquetes = data;
      
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.enquetesSubscription.unsubscribe();
  }

  async deleteEnquete(id: string){
    try{
      await this.enquetesService.deleteEnquete(id);
    }catch(error){
      this.presentToast('Erro ao tentar excluir!');
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

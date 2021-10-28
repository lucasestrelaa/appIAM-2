import { RA } from './../../interfaces/ra';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AdmRAService } from 'src/app/services/adm-ra.service';
import { AdmProfissaoService } from 'src/app/services/adm-profissao.service';
import { Profissao } from 'src/app/interfaces/profissao';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.page.html',
  styleUrls: ['./adm.page.scss'],
})
export class AdmPage implements OnInit {
  private loading: any;

  public ras = new Array<RA>();
  private RASubscription: Subscription;

  public profissoes = new Array<Profissao>();
  private profissaoSubscription: Subscription;
  constructor(
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,

    private raService: AdmRAService,
    private profissaoService: AdmProfissaoService,
    ) {
      this.RASubscription = this.raService.getRAs().subscribe(data => {
        this.ras = data;
      });
      this.profissaoSubscription = this.profissaoService.getProfissoes().subscribe(data => {
        this.profissoes = data;
        
      });
     }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.RASubscription.unsubscribe();
    this.profissaoSubscription.unsubscribe();
  }
  async deleteRA(id: string){
    try{
      await this.raService.deleteRA(id);
    }catch(error){
      this.presentToast('Erro ao tentar excluir!');
    }
  }
  async deleteProfissao(id: string){
    try{
      await this.profissaoService.deleteProfissao(id);
    }catch(error){
      this.presentToast('Erro ao tentar excluir!');
    }
  }





  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK', 'Cancel'],
      
    });

    await alert.present();
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

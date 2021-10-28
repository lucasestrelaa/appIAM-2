import { Component, OnInit } from '@angular/core';
import { Profissao } from 'src/app/interfaces/profissao';
import { Subscription } from 'rxjs';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AdmProfissaoService } from 'src/app/services/adm-profissao.service';

@Component({
  selector: 'app-adm-profissao',
  templateUrl: './adm-profissao.page.html',
  styleUrls: ['./adm-profissao.page.scss'],
})
export class AdmProfissaoPage implements OnInit {
  private loading: any;
  public profissao: Profissao = {};
  private ProfissaoId: string = null;
  private ProfissaoSubscription: Subscription;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private raService: AdmProfissaoService,
    private navCtrl: NavController,
  ) {
    this.ProfissaoId = this.activateRoute.snapshot.params['id'];

    if (this.ProfissaoId) this.loadProfissao();
   }

  ngOnInit() {
  }
  ngOnDestroy(){
    if (this.ProfissaoSubscription) this.ProfissaoSubscription.unsubscribe();
  }
  async salvarProfissao(){
    await this.presentLoading();

    //this.ra.id = (await this.authService.getAuth().currentUser).uid;
    console.log((await this.authService.getAuth().currentUser).email);
    if(this.ProfissaoId) {
      try{
        await this.raService.updateProfissao(this.ProfissaoId, this.profissao);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/adm');
      }catch (error){
        this.presentToast('Erro ao tentar salvar!');
        this.loading.dismiss();
      }
    }else{
      //this.ra.data = new Date().getTime();
      
      try{
        await this.raService.addProfissao(this.profissao);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/adm');
      }catch (error){
        this.presentToast('Erro ao tentar salvar!');
        this.loading.dismiss();
      }
    }

  }
  loadProfissao(){
    this.ProfissaoSubscription = this.raService.getProfissao(this.ProfissaoId).subscribe(data => {
      this.profissao = data;
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

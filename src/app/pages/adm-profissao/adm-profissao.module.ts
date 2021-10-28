import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmProfissaoPageRoutingModule } from './adm-profissao-routing.module';

import { AdmProfissaoPage } from './adm-profissao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmProfissaoPageRoutingModule
  ],
  declarations: [AdmProfissaoPage]
})
export class AdmProfissaoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmRAPageRoutingModule } from './adm-ra-routing.module';

import { AdmRAPage } from './adm-ra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmRAPageRoutingModule
  ],
  declarations: [AdmRAPage]
})
export class AdmRAPageModule {}

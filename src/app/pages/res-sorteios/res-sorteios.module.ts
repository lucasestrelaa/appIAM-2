import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResSorteiosPageRoutingModule } from './res-sorteios-routing.module';

import { ResSorteiosPage } from './res-sorteios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResSorteiosPageRoutingModule
  ],
  declarations: [ResSorteiosPage]
})
export class ResSorteiosPageModule {}

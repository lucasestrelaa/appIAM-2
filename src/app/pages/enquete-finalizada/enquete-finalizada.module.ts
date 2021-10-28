import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnqueteFinalizadaPageRoutingModule } from './enquete-finalizada-routing.module';

import { EnqueteFinalizadaPage } from './enquete-finalizada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnqueteFinalizadaPageRoutingModule
  ],
  declarations: [EnqueteFinalizadaPage]
})
export class EnqueteFinalizadaPageModule {}

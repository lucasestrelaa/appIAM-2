import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResFinalizadosPageRoutingModule } from './res-finalizados-routing.module';

import { ResFinalizadosPage } from './res-finalizados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResFinalizadosPageRoutingModule
  ],
  declarations: [ResFinalizadosPage]
})
export class ResFinalizadosPageModule {}

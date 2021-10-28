import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnqueteSemanalPageRoutingModule } from './enquete-semanal-routing.module';

import { EnqueteSemanalPage } from './enquete-semanal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnqueteSemanalPageRoutingModule
  ],
  declarations: [EnqueteSemanalPage]
})
export class EnqueteSemanalPageModule {}

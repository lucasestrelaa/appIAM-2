import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DenquetesPageRoutingModule } from './denquetes-routing.module';

import { DenquetesPage } from './denquetes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DenquetesPageRoutingModule
  ],
  declarations: [DenquetesPage]
})
export class DenquetesPageModule {}

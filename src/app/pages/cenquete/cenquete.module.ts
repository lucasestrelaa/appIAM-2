import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CenquetePageRoutingModule } from './cenquete-routing.module';

import { CenquetePage } from './cenquete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CenquetePageRoutingModule
  ],
  declarations: [CenquetePage]
})
export class CenquetePageModule {}

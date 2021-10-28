import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResEnquetePageRoutingModule } from './res-enquete-routing.module';

import { ResEnquetePage } from './res-enquete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResEnquetePageRoutingModule
  ],
  declarations: [ResEnquetePage]
})
export class ResEnquetePageModule {}

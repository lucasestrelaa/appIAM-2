import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmRAPage } from './adm-ra.page';

const routes: Routes = [
  {
    path: '',
    component: AdmRAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmRAPageRoutingModule {}

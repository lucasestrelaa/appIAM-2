import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmProfissaoPage } from './adm-profissao.page';

const routes: Routes = [
  {
    path: '',
    component: AdmProfissaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmProfissaoPageRoutingModule {}

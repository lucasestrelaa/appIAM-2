import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResFinalizadosPage } from './res-finalizados.page';

const routes: Routes = [
  {
    path: '',
    component: ResFinalizadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResFinalizadosPageRoutingModule {}

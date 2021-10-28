import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnqueteFinalizadaPage } from './enquete-finalizada.page';

const routes: Routes = [
  {
    path: '',
    component: EnqueteFinalizadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnqueteFinalizadaPageRoutingModule {}

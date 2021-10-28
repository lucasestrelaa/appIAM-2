import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnqueteSemanalPage } from './enquete-semanal.page';

const routes: Routes = [
  {
    path: '',
    component: EnqueteSemanalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnqueteSemanalPageRoutingModule {}

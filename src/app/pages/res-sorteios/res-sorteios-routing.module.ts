import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResSorteiosPage } from './res-sorteios.page';

const routes: Routes = [
  {
    path: '',
    component: ResSorteiosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResSorteiosPageRoutingModule {}

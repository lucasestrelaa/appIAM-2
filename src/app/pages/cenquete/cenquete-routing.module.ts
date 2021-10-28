import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CenquetePage } from './cenquete.page';

const routes: Routes = [
  {
    path: '',
    component: CenquetePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CenquetePageRoutingModule {}

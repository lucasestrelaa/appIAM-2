import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResEnquetePage } from './res-enquete.page';

const routes: Routes = [
  {
    path: '',
    component: ResEnquetePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResEnquetePageRoutingModule {}
